import React, {
	Component,
} from 'react';
import {
	View,
	WebView,
	Text,
	StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';


export default class Chart extends Component {
	static propTypes = {
		chartConfiguration: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props);

	}
	componentDidMount() {
	}
	componentWillReceiveProps(nextProps) {
		this.setChart( nextProps.chartConfiguration );
	}
	setChart(chartConfiguration) {
		this.webview && this.webview.injectJavaScript(`
			var ctx = document.getElementById("myChart").getContext('2d');
			var myChart = new Chart(ctx, ` + JSON.stringify( chartConfiguration ) +  
    `);`);
	}

	render() {
		return (
				< WebView style = {
					{
						flex: 1
					}
				}
				ref = {
					ref => this.webview = ref
				}
				injectedJavaScript = {'window.postMessage("")'}
				source = {
					require("./dist/index.html")
				}
				onMessage = {() => {
					this.setChart( this.props.chartConfiguration )
				}}
				onError = {
					(error) => {
						console.log(error)
					}
				}
				/>	
		)
	}
}