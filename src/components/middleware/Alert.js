import React from "react";
import Alert from '_atoms/alert/index.js';

const AlertContext = React.createContext({});

class AlertProvider extends React.Component {
      
    showAlert = (options) => {
        this.setState(prevState => ({
            ...prevState,
            text: options.text,
            color: options.color,
            accent: options.accent,
            textColor: options.textColor,
            textSize: options.textSize,
            animationDuration: options.animationDuration,
            duration: options.duration,
        }),  () => {
            this.alert.current.show();
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            color: '',
            accent: '',
            textColor: '',
            textSize: '',
            animationDuration: 0,
            duration: 0,
            show: this.showAlert,
        };

        this.alert = React.createRef();

    }

    render() {
        return (
            <AlertContext.Provider value={this.state}>
                {this.props.children}

                {this.state.animationDuration && this.state.duration ? (
                    <Alert 
                        text={this.state.text}
                        color={this.state.color}
                        accent={this.state.accent}
                        textColor={this.state.textColor}
                        textSize={this.state.textSize}
                        animationDuration={this.state.animationDuration}
                        duration={this.state.duration}
                        ref={this.alert}
                    ></Alert>
                ) : null}
            </AlertContext.Provider>
        );
    }
}

const AlertConsumer = AlertContext.Consumer

const withAlert = (WrappedComponent) => {
    class WithAlert extends React.Component {
      render() {
        return (
            <AlertConsumer>
                {alert => (<WrappedComponent {...this.props} alert={alert}/>)}
            </AlertConsumer>
        );
      }
    }
      
    return WithAlert;
  };


export {
    AlertProvider,
    AlertConsumer,
    withAlert
};