import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="비오키친" />
                    <meta property="og:site_name" content="다이어트푸드 전문키친" />
                    <meta property="og:url" content="https://www.xn--9w3b27lmmhzmc.kr/brand" />
                    <meta property="og:image" content="https://www.studiozinzin.com/image/ThumnailImage.jpeg" />
                    <meta property="og:image:width" content="800" />
                    <meta property="og:image:height" content="400" />
                    <meta property="og:description" content="건강한 식습관, 비오키친" key="description" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}


export default MyDocument