import axios from 'axios'
export default function movies() {

    return {
        info: [],

        logIn_message: '',
        message: '',
        error: '',
        film: '',

        signUp: {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
        },

        signIn: {
            username: '',
            password: '',
        },

        user_playlist: {
            user_id: '',
            movie_list: ''
        },

        playlisa: [],
        movies: [],
        show_movies: false,

        init() {
            setInterval(() => {
                this.message = '',
                    this.error = ''
                this.logIn_message = ''
            }, 4000);
        },

        regUser() {
            axios
                .post('http://localhost:4000/api/signUp', this.signUp)

                .then(results => {
                    console.log(results.data);
                    this.message = "User created"
                    this.error = "User already exists"
                    setInterval(() => {
                    }, 4000);
                    return true;
                    this.signUp = ''
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
                    
                    this.user = user;
                    localStorage.setItem('user', JSON.stringify(user));
                    this.token = JSON.stringify(token)
                    localStorage.setItem('token', this.token);
                    this.logIn_message = "You are logged in"
                    this.show_movies = true;
                    this.error = "The user doesn't exist"
                    setTimeout(() => {
                        this.token = ''
                    }, 4000);
                    return true;
                })
                .then(result => {
                    this.first_name = '',
                        this.last_name = '',
                        this.username = '',
                        this.password = ''
                    if (!result) {
                        this.show_movies = false;
                        this.message = 'Incorrect user credentials'
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },

        loggedUser(list) {
            const user_name= JSON.parse(localStorage.getItem('user'))
            axios
                .post('http://localhost:4000/api/playlist', list, 
                username = user_name        
                )
                .then(results => {
                    console.log(results.data);
                    setTimeout(() => {
                    }, 4000);
                    return true;
                }).catch(e => console.log(e))
        },

        playlist_data() {
          
            axios
                .get(`https://api.themoviedb.org/3/search/movie?api_key=0abc18f613656472c7842cc310309b21&query=${this.film}`)
                .then(results => {
                    this.movies = results.data.results;
                    console.log(this.movies);
                    setTimeout(() => {
                    }, 4000);
                    return true;
                }).catch(e => console.log(e))
        }
    }

}