/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import sideNav from '../../pageobjects/side-nav.page';
import {publicChannelName, privateChannelName} from '../../data/channel.js';
import {targetUser} from '../../data/interactions.js';

//test data imports
import {checkIfUserIsValid, setPublicChannelCreated, setPrivateChannelCreated, setDirectMessageCreated} from '../../data/checks';
import {username, email, password} from '../../data/user.js';
//Basic usage test start
describe('Channel creation', function() {
	before(()=>{
		checkIfUserIsValid(username, email, password);
		sideNav.getChannelFromList('general').waitForExist(5000);
		sideNav.openChannel('general');
	});

	beforeEach(()=>{
		sideNav.getChannelFromList('general').waitForVisible(5000);
		sideNav.openChannel('general');
	});

	afterEach(function() {
		if (this.currentTest.state !== 'passed') {
			setPublicChannelCreated(false);
			switch (this.currentTest.title) {
				case 'create a public channel':
					setPublicChannelCreated(false);
					console.log('Public channel Not Created!');
					break;
				case 'create a private channel':
					setPrivateChannelCreated(false);
					console.log('Private channel Not Created!');
					break;
				case 'start a direct message with rocket.cat':
					setDirectMessageCreated(false);
					console.log('Direct Message Not Created!');
					break;
			}
		}
	});

	describe('create a public channel', function() {
		it('create a public channel', function() {
			sideNav.createChannel(publicChannelName, false, false);
			setPublicChannelCreated(true);
		});
	});

	describe('create a private channel', function() {
		it('create a private channel', function() {
			sideNav.createChannel(privateChannelName, true, false);
			setPrivateChannelCreated(true);
		});
	});

	describe('direct channel', function() {
		it('start a direct message with rocket.cat', function() {
			sideNav.searchChannel(targetUser);
			setDirectMessageCreated(true);
		});
	});
});
