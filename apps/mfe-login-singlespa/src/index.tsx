import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { Provider } from 'react-redux';
import { LoginApp } from './LoginApp';
import { getSharedStore } from './store';
import './styles.css';

const lifecycles = singleSpaReact({
	React,
	ReactDOM,
	rootComponent: (props: any) => (
		<Provider store={getSharedStore()}>
			<LoginApp {...props} />
		</Provider>
	),
	errorBoundary(err, info, props) {
		return (
			<div className='p-4 bg-red-50 border border-red-200 rounded'>
				<h2 className='text-red-800 font-bold'>Erro no MFE de Login</h2>
				<pre className='text-sm text-red-600'>{err.message}</pre>
			</div>
		);
	},
	domElementGetter: (props) => props.domElement || document.getElementById('mfe-login-container')!,
});

export const { bootstrap, mount, unmount } = lifecycles;
