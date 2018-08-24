import Vue from 'vue'
import Router from 'vue-router'

const Login = (resolve) => {
  import('components/login/login').then((module) => {
    resolve(module)
  })
}

const IndexHome = (resolve) => {
  import('components/index/index').then((module) => {
    resolve(module)
  })
}

const Home = (resolve) => {
  import('components/home/home').then((module) => {
    resolve(module)
  })
}

const Upload = (resolve) => {
  import('components/upload/upload').then((module) => {
    resolve(module)
  })
}

const Message = (resolve) => {
  import('base/message/message').then((module) => {
    resolve(module)
  })
}

const AccountInfo = (resolve) => {
  import('components/account-info/account-info').then((module) => {
    resolve(module)
  })
}

const AboutUs = (resolve) => {
  import('base/about-us/about').then((module) => {
    resolve(module)
  })
}

const UserAgreement = (resolve) => {
  import('base/user-agreement/userAgreement').then((module) => {
    resolve(module)
  })
}

const TourtComplaint = (resolve) => {
  import('base/tourt-complaint/tourtComplaint').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      redirect: '/index',
      component: IndexHome,
      children: [
        {
          path: 'index',
          name: 'index',
          meta: {
            requireAuth: true
          },
          component: Home
        },
        {
          path: 'upload',
          name: 'upload',
          meta: {
            requireAuth: true
          },
          component: Upload
        },
        {
          path: 'message',
          name: 'message',
          meta: {
            requireAuth: true
          },
          component: Message
        },
        {
          path: 'account-info',
          name: 'account',
          meta: {
            requireAuth: true
          },
          component: AccountInfo
        }
      ]
    },
    {
      path: '/about-us',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/user-agreement',
      name: 'UserAgreement',
      component: UserAgreement
    },
    {
      path: '/tourt-complaint',
      name: 'TourtComplaint',
      component: TourtComplaint
    }
  ],
  mode: 'history'
})
