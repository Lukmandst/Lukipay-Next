import  Head  from "next/head"

function Layout({children, title = 'Lukipay'}) {
  return (
    <>
    <Head>
        <title>{title}</title>
    </Head>
    </>
  )
}

export default Layout