import React from "react"
import Terminal from "terminal-in-react";

export default class CustomTerminal extends React.Component {
    render() {
        return(
        <Terminal
            color={"#00FF00"}
            backgroundColor='black'
            barColor='black'
            outputColor={"#FFFFFF"}
            startState={"maximised"}
            prompt={"#00FF00"}
            hideTopBar={true}
            allowTabs={false}
            promptSymbol={"simon@epilan > "}
            style={{fontWeight: "bold", fontSize: "1em"}}
            commands={{
                'sign-in': (args, print, runCommand) => {
                    const text = args.slice(1).join(' ');
                    print('Enter Password:');
                },
                showmsg: this.showMsg,
                popup: () => alert('Terminal in React'),
                'ls': () => "README",
                'cat': () => this.text
            }}
            descriptions={{
                'open-google': 'opens google.com',
                showmsg: 'shows a message',
                alert: 'alert', popup: 'alert',
                'ls': "List files.",
                'cat': "Shows the content of a file.",
            }}
            msg='Bienvenue au Speed Coding EPITA, lisez le fichier README pour en savoir plus!'
        />
        )
    }
}