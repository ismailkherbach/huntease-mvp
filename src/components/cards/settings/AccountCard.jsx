import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import {
  Row,
  Col,
  Input,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import Terms from "./Terms";
import Helps from "./Helps";
import { changeLocale } from "../../../redux/actions";
import { localeOptions } from "../../../constants/defaultValues";

class AccountCall extends React.Component {
  handleChangeLocale = locale => {
    this.props.changeLocale(locale);
  };
  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <Row>
              <div id="settings-card">
                <Col>
                  <Row>
                    <Col>
                      <div id="field-top">First name</div>
                      <Input id="field" />
                    </Col>

                    <Col>
                      <div id="field-top">Last name</div>
                      <Input id="field" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div id="field-top">Company</div>
                      <Input id="field" />
                    </Col>

                    <Col>
                      <div id="field-top">Industry</div>
                      <Input id="field" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div id="field-top">Location</div>
                      <Input id="field" />
                    </Col>

                    <Col>
                      <div id="field-top">Role</div>
                      <Input id="field" />
                    </Col>
                  </Row>
                  <div id="field-bottom">General settings</div>
                  <Col>
                    <div className="inlineBtn-left">
                      <h3 id="field-top" className="mr-4">
                        Langue
                      </h3>
                      <UncontrolledDropdown
                        value={"langue"}
                        className="d-inline-block mt-4"
                      >
                        <DropdownToggle id="field"></DropdownToggle>
                        <DropdownMenu className="field">
                          {localeOptions.map(l => {
                            return (
                              <DropdownItem
                                onClick={() => this.handleChangeLocale(l.id)}
                                key={l.id}
                              >
                                {l.name}
                              </DropdownItem>
                            );
                          })}
                        </DropdownMenu>
                      </UncontrolledDropdown>{" "}
                    </div>

                    <div className="inlineBtn-left">
                      <h3 id="field-top">Time zone</h3>
                      <div id="field-bottom-input"></div>
                    </div>
                  </Col>
                </Col>
              </div>
            </Row>
          </Col>
          <Col>
            <Row>
              <div id="profil-card"></div>
            </Row>
            <Row className="pt-0">
              <Terms />
            </Row>
            <Row>
              <Helps />
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return {
    locale
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    changeLocale
  })(AccountCall)
);
