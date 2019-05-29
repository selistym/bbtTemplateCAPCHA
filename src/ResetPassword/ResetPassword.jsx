import React, { useState, useEffect } from 'react';
import config from 'config';
import { Link, Redirect } from 'react-router-dom';
import { Icon, Alert } from 'antd';

import back from './back.png';

export const ResetPassword = (props) => {

	const [submitted, toSubmit] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [success, setSuccess] = useState(false);
  const [alertSet, activateAlert] = useState(false);

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		toSubmit(true);
	};

	useEffect(() => {
		if(!submitted) return;
		toSubmit(false);
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('accept', 'application/json');
		fetch(`${config.apiUrl}/auth/login`, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({ email: email, password: password })
		}).then(response => response.json()).then(data => {
			if(data.message !== 'Auth failed') {
				data.email = email;
				localStorage.setItem('user', JSON.stringify(data));
				setSuccess(true);
			} else {
        activateAlert(true);
        setTimeout(() => {
          activateAlert(false);
        }, 1500);
      }
		});
	}, [submitted]);

	return (
		<div className="custom" style={{ height: '100vh', width: '100vw', position: 'relative' }}>
			<img src={back} style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 1 }} />
			<div className="container" style={{ position: 'absolute', zIndex: 2, width: '100%' }}>
        { alertSet && <Alert style={{ position: 'fixed', right: 0, zIndex: 999, margin: '10px 15px' }} message="Wrong email and/or password!" type="warning" /> }
				<div className="row">
					<div className="col-sm-4 col-xs-1"></div>
					<div className="col-sm-4 col-xs-10" style={{ padding: '50px 30px', background: 'white', borderRadius: '3px', marginTop: '25vh' }}>
						<div>
							<h2 className="text-center">Reset password</h2>
							<br />
							<form name="form" onSubmit={handleSubmit}>								
								<div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
									<input type="password" className="form-control" placeholder="Password" autoComplete="true" name="password" value={password} onChange={handlePassword} />
									{ submitted && !password &&
										<div className="help-block">Password is required</div>
									}
								</div>
								<div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
									<input type="password" className="form-control" placeholder="Confirm Password" autoComplete="true" name="password1" value={password} onChange={handlePassword} />
									{ submitted && !password &&
										<div className="help-block">Password is required</div>
									}
								</div>

								<br />
								<div className="form-group">
									<button className="btn btn-warning" style={{ width: '100%' }}>Reset Password</button>
								</div>
								<br />
								<div className="text-left">
									<a href="#"><Icon type="left" /> Sign in</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			{ success && <Redirect to='/' /> }
		</div>
	);
};
