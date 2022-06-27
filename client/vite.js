import axios from 'axios'
export default function movies() {

    return {
        info: [],
        loggedUser: {},
        signUp: {
            first_name: '',
            last_name: '',
            username: '',
            password: '',

        },
        signIn: {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
        },

        user_playlist:{
            user_id: '',
            movie_list: ''
        },

        regUser() {
            axios
              .post('http://localhost:4000/api/signUp', this.signUp)
      
              .then(results => {
                console.log(results.data);
                this.message
              }).catch(e => console.log(e))
          },

          logUser() {

            axios
              .post('http://localhost:4000/api/logIn', this.signIn)
              .then((qApp) => {
                var { token, user } = qApp.data;
                console.log(qApp.data);
                if (!token) {
                  return false
                }
      
                this.isOpen = true;
                this.user = user;
                localStorage.setItem('user', JSON.stringify(user));
                this.token = JSON.stringify(token)
                localStorage.setItem('token', this.token);
      
                setTimeout(() => {
                  this.token = ''
                }, 4000);
                return true;
              })
      
              .then(result => {
                if (!result) {
                  this.isOpen = false;
                  this.message = 'Incorrect user credentials'
                }
              })
              .catch((err) => {
                console.log(err)
              })
            }

            

    }
}