import { Document, Html, DocumentHead, Main, BlitzScript } from 'blitz';
// import { getSessionContext } from '@blitzjs/server'
// import { useCurrentUser } from 'app/core/hooks/useCurrentUser'

// const CurrentUser = () => {
//   const currentUser = useCurrentUser()

//   return null
// }

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   console.log('GETTING INITIAL PROPS')
  //   const initialProps = await Document.getInitialProps(ctx)
  //   const { req, res } = ctx
  //   if (req) {
  //     const session = await getSessionContext(req, res)
  //     console.log(session.userId)
  //     initialProps.userId = session.userId
  //   }
  //   return { ...initialProps }
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <body>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <Main />
          <BlitzScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
