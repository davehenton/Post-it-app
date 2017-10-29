import React from 'react';
import { Link } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import GoogleButton from 'react-google-button';
import firebase from '../../src/vendors/index';
import axiosMock from '../../src/__mock__/axiosMock.jsx';
import expect from 'expect';
import sinon from 'sinon';
import Footer from '../../src/components/Footer';
import { signinAction } from '../../src/actions/signInActions';
import UserSignIn from '../../src/components/UserSignIn';
import SignInStore from '../../src/stores/SignInStore';
import signInResponse from '../../src/__mock__/signInResponse.json';

jest.mock('../../src/vendors/index.js', () => {
  /**
   * @description describes a function that mocks firebase module,
   * fires it action to make an Api call, returns a promise that is mocked
   *
   * @param { void } void takes no parameter
   *
   * @return { object } mockfirebase object
   *
   * @function Test
   */
  function Test() {

  }
  const mockFirebase = jest.fn().mockReturnValue({
    signInWithPopup: jest.fn().mockReturnValue(Promise.resolve({
      user: 'testUser'
    }))
  });
  Test.prototype.addScope = jest.fn();
  mockFirebase.GoogleAuthProvider = Test;
  return {
    auth: mockFirebase,
  };
});

describe('UserSignIn component', () => {
  let wrapper;
  // let axiosMock;
  const onSubmitSpy = sinon.spy();
  const signinActionSpy = signinAction;
  beforeEach(() => {
    // axiosMock = mockApiCall;
    // jest.mock('axios', () => axiosMock);
    SignInStore.signInUser = jest.fn(() => signInResponse);
    const props = {
      // userName: '',
      // userId: '',
      email: 'qudus@gmail.com',
      password: 'Ka123@',
      // signinMessage: '',
      onClick: () => {},
      onChange: () => {},
      handleGoogleEvent: () => {},
      handleSignInAction: () => {},
    };
    wrapper = mount(<UserSignIn {...props}/>,
      {
        childContextTypes: { router: React.PropTypes.object },
        context: {
          router: {
            history: {
              push: () => null,
              replace: () => null,
              createHref: () => null,
              path: '/signin',
              component: '[function UserSignIn]',
              location: {
                pathname: '/signin',
                search: '',
                hash: '',
                key: 'on2bj3'
              },
              computedMatch: {
                path: '/signin',
                url: '/signin',
                isExact: true,
                params: {}
              }
            }
          }
        }
      }
    );
  });
  it('should have an empty initial state', () => {
    expect(wrapper.state()).toBeDefined();
    expect(wrapper.state().userName).toEqual('');
    expect(wrapper.state().userId).toEqual('');
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().password).toEqual('');
  });

  it('should contain <Footer/>', () => {
    expect(wrapper.find(Footer).root.length).toEqual(1);
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('should contain defined methods', () => {
    expect(wrapper.nodes[0].onChange).toBeDefined();
    expect(wrapper.nodes[0].onSubmit).toBeDefined();
    expect(wrapper.nodes[0].handleSignInAction).toBeDefined();
    expect(wrapper.nodes[0].googleSignIn).toBeDefined();
    expect(wrapper.nodes[0].handleGoogleEvent).toBeDefined();
  });

  it('It should call onChange method', () => {
    const event = { target: { name: 'name', value: 'value' } };
    wrapper.instance().onChange(event);
    expect(wrapper.state().name).toEqual('value');
  });
  it('should call onSubmit method', () => {
    wrapper.instance().onSubmit({ preventDefault() {} });
    expect(wrapper.state().email).toEqual('');
  });
  it('should componentDidMount component lifecycle', () => {
    const spy = sinon.spy(UserSignIn.prototype, 'componentDidMount');
    wrapper.instance().componentDidMount();
    expect(spy.calledOnce).toBeTruthy();
  });

  it('should call componentWillUnmount component lifecycle', () => {
    const spy = sinon.spy(UserSignIn.prototype, 'componentWillUnmount');
    wrapper.instance().componentWillUnmount();
    expect(spy.calledOnce).toBeTruthy();
  });
  it('should find a link', () => {
    expect(wrapper.find(Link).at(2).prop('to')).toEqual('/signin');
    expect(wrapper.find(Link).at(3).prop('to')).toEqual('/passwordreset');
    expect(wrapper.find(Link).at(4).prop('to')).toEqual('/');
  });

  it('should render correctly', () => {
    const component = shallow(<UserSignIn/>);
    expect(component).toMatchSnapshot();
    expect(component.find('form')).toHaveLength(1);
    expect(component.find('input')).toHaveLength(2);
    expect(component.find('input.signinform')).toHaveLength(2);
  });
  it('should contain a google button', () => {
    wrapper.find(GoogleButton).simulate('click');
    expect(firebase.auth.GoogleAuthProvider.prototype.addScope)
      .toHaveBeenCalledTimes(1);
    expect(firebase.auth().signInWithPopup).toHaveBeenCalled();
  });
  it('should take props', () => {
    expect(wrapper.props().onChange).toBeTruthy();
    expect(wrapper.props().onClick).toBeTruthy();
    expect(wrapper.props().handleSignInAction).toBeTruthy();
    expect(wrapper.props().handleGoogleEvent).toBeTruthy();
  });
});


describe('<UserSignIn />', () => {
  const signinActionSpy = signinAction;
  it('simulates click events', () => {
    const onSubmitSpy = sinon.spy();
    const component = shallow(<UserSignIn onSubmitSpy={signinActionSpy}/>);
    component.find('#signinformbtn').simulate('click');
    expect(component.props.onSubmitSpy).toHaveBeenCalled();
  });
});

