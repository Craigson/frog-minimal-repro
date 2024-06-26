/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";

const app = new Frog({
    assetsPath: "/",
    basePath: "/api/frame/demo",
    // Supply a Hub to enable frame verification.
    // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

// This needs to be uncommented in order to run locally with `next dev`. However, must be enabled when deployed to vercel.
// If runtime is not "edge", serverless fn will timeout and return 504
export const runtime = "edge";

app.frame("/", (c) => {
    const { buttonValue, inputText, status } = c;
    const fruit = inputText || buttonValue;
    return c.res({
        image: (
            <div
                style={{
                    alignItems: "center",
                    background: status === "response" ? "linear-gradient(to right, #432889, #17101F)" : "black",
                    backgroundSize: "100% 100%",
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    height: "100%",
                    justifyContent: "center",
                    textAlign: "center",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        color: "white",
                        fontSize: 60,
                        fontStyle: "normal",
                        letterSpacing: "-0.025em",
                        lineHeight: 1.4,
                        marginTop: 30,
                        padding: "0 120px",
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {status === "response" ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ""}` : "Welcome!"}
                </div>
            </div>
        ),
        intents: [
            <TextInput key="frame-input-1" placeholder="Enter custom fruit..." />,
            <Button key="frame-button-1" value="oranges">
                Oranges
            </Button>,
            <Button key="frame-button-2" value="apples">
                Apples
            </Button>,
            <Button key="frame-button-3" value="bananas">
                Bananas
            </Button>,
            status === "response" && <Button.Reset>Reset</Button.Reset>,
        ],
    });
});

devtools(app, { serveStatic });

export default handle(app);
