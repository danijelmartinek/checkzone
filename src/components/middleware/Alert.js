import React from "react";
import Alert from '_atoms/alert/index.js';

const AlertContext = React.createContext({});

class AlertProvider extends React.Component {
      
    showAlert = (options) => {
        this.setState(prevState => ({
            ...prevState,
            text: options.text,
            color: options.color,
            textColor: options.textColor,
            animationDuration: options.animationDuration,
            duration: options.duration,
        }));
        this.alert.current.show();
    }

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            color: '',
            textColor: '',
            animationDuration: 500,
            duration: 2500,
            show: this.showAlert,
        };

        this.alert = React.createRef();

    }

    render() {
        return (
            <AlertContext.Provider value={this.state}>
                {this.props.children}

                <Alert 
                    text={this.state.text}
                    color={this.state.color}
                    textColor={this.state.textColor}
                    animationDuration={this.state.animationDuration}
                    duration={this.state.duration}
                    ref={this.alert}
                ></Alert>
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