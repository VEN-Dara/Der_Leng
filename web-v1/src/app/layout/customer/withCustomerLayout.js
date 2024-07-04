/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import { Col, Layout, Row } from 'antd';
import propTypes from 'prop-types';
import { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { FooterStyle, LayoutContainer, SmallScreenAuthInfo, TopMenuSearch } from './Style';
import TopMenu from './TopMenu';
import Search from './auth-info/Search';
import AuthInfo from './auth-info/AuthInfo';
import derlengLogo from '../../static/img/logo/derleng-logo.svg'

const { theme } = require('../../config/theme/themeVariables');

const { Header, Sider, Content } = Layout;

const withCustomerLayout = (WrappedComponent) => {
  class LayoutComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
        hide: true,
      };
      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
      this.updateDimensions();
      this.setThemeMode();
    }

    // :: Set theme mode ::
    setThemeMode() {
      const { layoutMode } = this.props;
      if (layoutMode === 'darkMode') {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
      this.setState({
        collapsed: window.innerWidth <= 1200 && true,
      });
    }

    render() {
      const { collapsed, hide } = this.state;
      const { layoutMode, rtl, topMenu } = this.props;
      const html = document.querySelector('html');
      html.classList.add('hexadash-topmenu');

      const left = !rtl ? 'left' : 'right';
      const toggleCollapsed = () => {
        this.setState({
          collapsed: !collapsed,
        });
      };

      const onShowHide = () => {
        this.setState({
          hide: !hide,
        });
      };

      function renderThumb({ style }) {
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: '#F1F2F6',
        };
        return <div style={{ ...style, ...thumbStyle }} />;
      }

      function renderView({ style }) {
        const customStyle = {
          marginRight: rtl && 'auto',
          [rtl ? 'marginLeft' : 'marginRight']: '-17px',
        };
        return <div style={{ ...style, ...customStyle }} />;
      }
      renderThumb.propTypes = {
        style: propTypes.shape(propTypes.object),
      };
      renderView.propTypes = {
        style: propTypes.shape(propTypes.object),
      };

      return (
        <LayoutContainer>
          <Layout className="layout">
            <Header
              style={{
                position: 'fixed',
                width: '100%',
                top: 0,
                [!rtl ? 'left' : 'right']: 0,
              }}
              className="p-0 flex items-center justify-between bg-white dark:bg-[#1b1e2b] dark:shadow-[0_5px_20px_rgba(160,160,160,.02)] h-[72px] z-998"
            >
              <div className="flex flex-row items-center flex-1 h-full">

                {/* ===================================> web logo <===================================*/}

                <div className=" rtl:ssm:pr-[15px] ltr:pr-5 rtl:pl-5 ltr:ssm:pl-[15px] ltr:ssm:pr-[15px] rtl:ssm::pl:[15px] ltr:pl-[30px] rtl:pr-[30px] xs:ltr:pl-[20px] xs:rtl:pr-[20px] min-w-[180px] h-full grid align-middle dark:bg-[#323541]">
                  <div className="flex items-center justify-between">
                    <Link to="/">
                      <img
                        className="w-full max-w-[120px] xs:max-w-[100px]"
                        src={
                          layoutMode === 'lightMode'
                            ? derlengLogo
                            : derlengLogo
                        }
                        alt="ដើរលេង"
                      />
                    </Link>
                    <TopMenu />
                  </div>
                </div>
                <div className="flex items-center justify-between flex-auto ltr:mr-[10px] rtl:ml-[10px] [&>div:first-child]:flex [&>div]:items-center ">
                  {/* {topMenu && window.innerWidth > 991 ? <TopMenu /> : <div></div> } */}
                  <div></div>
                  <div className="flex flex-row items-center md:hidden">
                    {topMenu && window.innerWidth > 991 ? (
                      <TopMenuSearch>
                        <div className="flex top-right-wrap">
                          <AuthInfo />
                        </div>
                      </TopMenuSearch>
                    ) : (
                        <AuthInfo />
                    )}
                  </div>
                </div>
                <div className="hidden md:flex items-center ltr:pr-[25px] rtl:pl-[25px] ltr:ssm:pr-[10px] rtl:ssm:pl-[10px]">
                  <Search />
                  <Link className="inline-flex text-light dark:text-white60" onClick={onShowHide} to="#">
                    <UilEllipsisV className="w-[18px] h-[18px]" />
                  </Link>
                </div>
              </div>
            </Header>

            {/* ==============================> Profile When width < 991 <============================ */}
            <Row>
              <Col md={0} sm={24} xs={24}>
                <SmallScreenAuthInfo hide={hide}>
                  <AuthInfo rtl={rtl} />
                </SmallScreenAuthInfo>
              </Col>
            </Row>
            <Layout>
              <div className='w-full'>
                <Layout className="atbd-main-layout ">
                  <Content>
                    <WrappedComponent {...this.props} />
                    <FooterStyle className="bg-white dark:bg-[#1B1E2B]">
                      <Row>
                        <Col md={12} xs={24}>
                          <span className="inline-block w-full font-medium admin-footer__copyright md:text-center text-theme-gray dark:text-white60 md:mb-[10px]">
                            © 2024
                            <Link className="mx-[4px] text-primary" to="#">
                              ដើរលេង Derleng
                            </Link>
                          </span>
                        </Col>
                        <Col md={12} xs={24}>
                          <div className="justify-end md:justify-center items-center flex gap-[15px]">
                            <NavLink className="text-theme-gray dark:text-white60 text-[14px] hover:text-primary" to="#">
                              I4 GIC
                            </NavLink>
                            <NavLink className="text-theme-gray dark:text-white60 text-[14px] hover:text-primary" target='_blank' to="https://github.com/VEN-Dara/der_leng">
                              Github
                            </NavLink>
                            <NavLink className="text-theme-gray dark:text-white60 text-[14px] hover:text-primary" target='_blank' to="https://t.me/dara_ven">
                              Contact
                            </NavLink>
                          </div>
                        </Col>
                      </Row>
                    </FooterStyle>
                  </Content>
                </Layout>
              </div>
            </Layout>
          </Layout>
          {window.innerWidth <= 991 ? (
            <span className={collapsed ? 'hexadash-shade' : 'hexadash-shade show'} onClick={toggleCollapsed} />
          ) : (
            ''
          )}
        </LayoutContainer>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      layoutMode: state.ChangeLayoutMode.mode,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: true,
    };
  };

  LayoutComponent.propTypes = {
    layoutMode: propTypes.string,
    rtl: propTypes.bool,
    topMenu:  propTypes.bool,
  };

  return connect(mapStateToProps)(LayoutComponent);
};
export default withCustomerLayout;
