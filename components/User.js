import React from 'react'

import request from '../utils/api/request'

let user

export default function withUser (WrappedComponent) {
  return class extends React.Component {
    static async getInitialProps (ctx) {
      console.log('in user getInitialProps')
      const childProps = await WrappedComponent.getInitialProps(ctx)
      if (user) {
        return {
          user,
          ...childProps,
        }
      }

      let newUser = await request('/profile', { req: ctx.req })
      return {
        user: newUser,
        ...childProps,
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }
}