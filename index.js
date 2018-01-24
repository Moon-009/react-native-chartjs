import React, {
	Component,
} from 'react';
import {
	WebView,
	StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
/**
 * 渲染图表脚本的模版，设置时将CONFIG参数替换成对应的值
 * @type {[string]}
 */
var settingChartScript = `
	Chart.defaults.global.defaultFontSize={DEFAULT_FONT_SIZE};
	var ctx = document.getElementById("myChart").getContext('2d');
	var myChart = new Chart( ctx, {CONFIG} );
`;

export default class Chart extends Component {
	
	static propTypes = {
		/**
		 * 图表配置参数，对应chart.js中初始化需要的参数
		 * @type {[object]}
		 */
		chartConfiguration: PropTypes.object.isRequired,
		defaultFontSize : PropTypes.number
	}
	constructor(props) {
		super(props);
	}
	componentWillReceiveProps(nextProps) {
		if( nextProps.chartConfiguration !== this.props.chartConfiguration
			|| nextProps.defaultFontSize !== this.props.defaultFontSize ){
			this.setChart(nextProps.chartConfiguration, nextProps.defaultFontSize );
		}
	}
	setChart(chartConfiguration, defaultFontSize) {
		if( !chartConfiguration || undefined == defaultFontSize || null == defaultFontSize ){
			return ;
		}
		this.webview && this.webview.injectJavaScript( 
			settingChartScript.replace('{CONFIG}', JSON.stringify( chartConfiguration ))
				.replace('{DEFAULT_FONT_SIZE}', defaultFontSize )
		);
	}

	render() {
		const defaultFontSize = this.props.defaultFontSize ? this.props.defaultFontSize : 12;
		return ( < WebView style={{ flex : 1 }}
					ref = {
						ref => this.webview = ref
					}
					injectedJavaScript = {
						settingChartScript.replace( '{CONFIG}', JSON.stringify( this.props.chartConfiguration ))
							.replace('{DEFAULT_FONT_SIZE}', defaultFontSize )
					}
					source = {
						require('./dist/index.html')
					}
					
					onError = {
						(error) => {
							console.log(error)
						}
					}
					scalesPageToFit = { true }
				/>	
		)
	}
}
