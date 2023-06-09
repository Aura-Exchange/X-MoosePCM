import { Head } from "components/Head";
import Layout from "components/Layout";
import { Box, Flex } from "components/primitives";
import { NextPage } from "next";

const RevokePage: NextPage = () => {
    return (
        <Layout>
            <Box
                css={{
                    p: 24,
                    height: '100%',
                    '@bp800': {
                        p: '$6',
                    },
                }}
            >
                <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
                    <iframe
                        src={'https://revoke.cash/'}
                        width="100%"
                        height="100%"
                    ></iframe>
                </div>
            </Box>
        </Layout>
    )
}
export default RevokePage