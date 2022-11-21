import { userService } from '../../services/user.service.js'
import { showErrorMsg } from '../../services/event-bus.service.js'

// export function loadUsers() {
//     return async dispatch => {
//         try {
//             dispatch({ type: 'LOADING_START' })
//             const users = await userService.getUsers()
//             console.log('FROM USER',users);
//             dispatch({ type: 'SET_USERS', users })
//         } catch (err) {
//             console.log('UserActions: err in loadUsers', err)
//         } finally {
//             dispatch({ type: 'LOADING_DONE' })
//         }
//     }
// }

export function updateUser(userToUpdate) {
  // console.log('before action', userToUpdate);
  return async (dispatch) => {
    try {
      const user = await userService.update(userToUpdate)
      //   console.log('user after action', user)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('Cannot update user')
    }
  }
}

export function removeUser(userId) {
  return async (dispatch) => {
    try {
      await userService.remove(userId)
      dispatch({ type: 'REMOVE_USER', userId })
    } catch (err) {
      console.log('UserActions: err in removeUser', err)
    }
  }
}

export function onLogin(credentials, cb) {
  console.log('onLogin', credentials)
  return async (dispatch) => {
    console.log('ACTION AFTER DISPATCH')
    try {
      const user = await userService.login(credentials)
      console.log(user)
      dispatch({
        type: 'SET_USER',
        user,
      })
      cb()
    } catch (err) {
      showErrorMsg('Cannot login')
      console.log('Cannot login', err)
    }
  }
}

export function onSignup(credentials) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(credentials)
      //   console.log(user)
      dispatch({
        type: 'SET_USER',
        user,
      })
    } catch (err) {
      showErrorMsg('Cannot signup')
      console.log('Cannot signup', err)
    }
  }
}

export function onLogout() {
  console.log('user logout')
  return async (dispatch) => {
    try {
      await userService.logout()
      dispatch({
        type: 'SET_USER',
        user: null,
      })
    } catch (err) {
      showErrorMsg('Cannot logout')
      console.log('Cannot logout', err)
    }
  }
}

export function loadUser(userId) {
  //   console.log('user action', userId)
  return async (dispatch) => {
    try {
      const user = await userService.getById(userId)
      dispatch({ type: 'SET_WATCHED_USER', user })
    } catch (err) {
      showErrorMsg('Cannot load user')
      console.log('Cannot load user', err)
    }
  }
}
