import Vuex from "vuex";
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPost: [],
      token: null
    },

    mutations: {
      SET_POSTS(state, posts) {
        state.loadedPost = posts;
      },

      ADD_POST(state, newPost) {
        state.loadedPost.push(newPost);
      },

      EDIT_POST(state, editedPost) {
        const postIndex = state.loadedPost.findIndex(
          post => post.id === editedPost.id
        );

        state.loadedPost[postIndex] = editedPost;
      },

      SET_TOKEN(state, token) {
        state.token = token;
      },

      CLEAR_TOKEN(state) {
        state.token = null;
      }
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get(`/posts.json`)
          .then(data => {
            const tempPosts = [];

            for (const key in data) {
              tempPosts.push({ ...data[key], id: key });
            }

            vuexContext.commit("SET_POSTS", tempPosts);
          })
          .catch(error => console.log(error));
      },

      setPosts(vuexContext, posts) {
        vuexContext.commit("SET_POSTS", posts);
      },

      addPost(vuexContext, newPost) {
        const createdPost = {
          ...newPost,
          updatedDate: new Date()
        };
        return this.$axios
          .$post(`/posts.json?auth=${vuexContext.state.token}`, createdPost)
          .then(data => {
            console.log(data);
            vuexContext.commit("ADD_POST", {
              ...createdPost,
              id: data.name
            });
          })
          .catch(error => console.log(error));
      },

      editPost(vuexContext, editedPost) {
        return this.$axios
          .$put(
            `/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,
            editedPost
          )
          .then(() => {
            vuexContext.commit("EDIT_POST", editedPost);
          })
          .catch(error => console.log(error));
      },

      authUser(vuexContext, authData) {
        let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbApiKey}`;

        if (!authData.isLogin) {
          authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbApiKey}`;
        }

        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(response => {
            vuexContext.commit("SET_TOKEN", response.idToken);

            localStorage.setItem("token", response.idToken);
            localStorage.setItem(
              "expiredToken",
              new Date().getTime() + +response.expiresIn * 1000
            );

            Cookie.set("token", response.idToken);
            Cookie.set(
              "expiredToken",
              new Date().getTime() + +response.expiresIn * 1000
            );

            return this.$axios.$post("http://localhost:3000/api/track-data", {
              data: "From api server"
            });
          })
          .catch(error => {
            console.log(error);
          });
      },

      initAuth(vuexContext, req) {
        let token;
        let expiredToken;

        if (req) {
          if (!req.headers.cookie) return;

          token = req.headers.cookie
            .split(";")
            .find(key => key.trim().startsWith("token="))
            .split("=")[1];

          expiredToken = req.headers.cookie
            .split(";")
            .find(key => key.trim().startsWith("expiredToken="))
            .split("=")[1];

          if (!token || !expiredToken) return;
        } else if (process.client) {
          token = localStorage.getItem("token");
          expiredToken = localStorage.getItem("expiredToken");
        }

        if (new Date().getTime() > +expiredToken || !token) {
          console.log("No token or token expired");
          vuexContext.dispatch("logout");
          return;
        }

        vuexContext.commit("SET_TOKEN", token);
      },

      logout(vuexContext) {
        vuexContext.commit("CLEAR_TOKEN");
        Cookie.remove("token");
        Cookie.remove("expiredToken");

        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("expiredToken");
        }
      }
    },

    getters: {
      getPosts(state) {
        return state.loadedPost;
      },

      isAuth(state) {
        return state.token;
      }
    }
  });
};

export default createStore;
