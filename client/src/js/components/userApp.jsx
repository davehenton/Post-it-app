import React from 'react';
import NavBar from './navBar.jsx';
import SignUp from './userSignUp.jsx';


/**
 * @description - renders App Component
 * @class App
 */
export default class App extends React.Component {
  /**
   * @description - render method, React lifecycle method
   * @returns {Object} App component
   * @App
   */
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row home">
            <div className="col-md-6">
              <h4>PostIt
                <small>
                  <i>App</i>
                </small>
                    &nbsp;
                  allows friends to come together and share vital information.
              </h4>
            </div>
            <SignUp/>
          </div>
        </div>
      </div>
    );
  }
}
