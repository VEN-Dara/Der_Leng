import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Table, Avatar } from 'antd';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../../resource/components/page-headers/page-headers';
import { GlobalUtilityStyle, PaginationStyle } from '../styled';
import { AutoComplete } from '../../../resource/components/autoComplete/autoComplete';
import { Button } from '../../../resource/components/buttons/buttons';
import defaultImgProfile from '../../static/img/default_img/derleng-default-profile.png'
import useScrollFetcher from '../../hooks/api-fetcher/useScrollFetcher';
import { formatDate } from '../../utility/format-function/date';
import ApiService from '../../config/api/apiService';

const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT
function TourGuide() {
  const PageRoutes = [
    {
      path: '/staff',
      breadcrumbName: 'ព៍តមាន',
    },
    {
      path: '',
      breadcrumbName: 'ម​គ្គុ​ទេស​ក៍​ទេសចរណ៍',
    },
  ];
  const api = new ApiService()
  const path = '/auth/users'
  const pathVar = 'role__name=tour_guide'
  const { data = [], page = 1, pageSize = 1, isLoading = true, isLoadMore = false } = useScrollFetcher({ path, moreVariablePath: pathVar })
  const searchKeyData = []
  const handleSearch = () => { }
  const [users, setUsers] = useState(data || []);

  useEffect(() => {
    setUsers(data);
  }, [data])

  const removeTourGuide = async (id) => {
    try {
      const response = await api.post(`/staff/remove_tour_guide/${id}`);
      setUsers(users.filter(user => user.id != id))
      message.success('ដកអ្នកប្រើប្រាស់ចេញពីមគ្គុទ្ទេសក៍ទេសចរណ៍ដោយជោគជ័យ📧✈️');
  
    } catch (error) {
      console.error('Remove tourguide error', error);
      
    }
    
  }

  const dataSource = [];
  if (users.length)
    users.map((value) => {
      const { id, username, email, fullname, phone, role, num_tour_package, total_income, profileImage, last_login } = value;
      return dataSource.push({
        key: id,
        name: (
          <div className="flex items-center gap-2">
            <Avatar
              size={44}
              src={
                profileImage ? profileImage : defaultImgProfile
              } />
            <div className='flex flex-col'>
              <span className="font-medium text-body dark:text-white60 m-0">{fullname}</span>
              <span className=' text-sm text-body dark:text-white60 m-0'>@{username} </span>
            </div>
          </div>
        ),
        contact: (
          <div className='flex flex-col'>
            <span className=" text-sm text-body dark:text-white60">{phone}</span>
            <span className=" text-sm text-body dark:text-white60">{email}</span>
          </div>
        ),
        tour_package: <span className=" product-id text-body dark:text-white60">{num_tour_package}</span>,
        income: <span className="font-normal text-body dark:text-white60">{total_income}</span>,
        date: <span className="font-normal text-body dark:text-white60">{formatDate(last_login)}</span>,
        action: (
          <div className="min-w-[80px] text-end -m-2 ">
            <Button
              onClick={() => removeTourGuide(id)}
              className="bg-gray-100 dark:bg-white10 h-[36px] w-[36px] mb-6 px-[11px] text-body dark:text-white60 border-none shadow-none hover:bg-danger-transparent hover:text-danger"
              to="#"
              size="default"
              type="danger"
              shape="circle"
              transparented
            >
              <UilTrashAlt className="w-[14px] h-[14px]" />
            </Button>
            {/* <Link className="inline-block m-2" to="#">
              <UilEdit className="w-4 text-light-extra dark:text-white60 hover:text-primary" />
            </Link>
            <Link className="inline-block m-2" to="#">
              <UilTrashAlt className="w-4 text-light-extra dark:text-white60 hover:text-danger" />
            </Link> */}
          </div>
        ),
      });
    });

  const columns = [
    {
      title: 'ម​គ្គុ​ទេស​ក៍​ទេសចរណ៍',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ទំនាក់ទំនង',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'កញ្ចប់ទេសចរណ៍',
      dataIndex: 'tour_package',
      key: 'tour_package',
    },
    {
      title: 'សមតុល្យប្រាក់ចំណូល',
      dataIndex: 'income',
      key: 'income',
    },
    {
      title: 'សកម្មចុងក្រោយ',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'ផ្សេងៗ',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  // const onSelectChange = (selectedRowKey) => {
  //   setState({ ...state, selectedRowKeys: selectedRowKey });
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };

  return (
    <>
      <PageHeader
        routes={PageRoutes}
        title="ម​គ្គុ​ទេស​ក៍​ទេសចរណ៍"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <GlobalUtilityStyle className="bg-white dark:bg-white10 p-[25px] rounded-10">
          <Row gutter={15}>
            <Col xs={24}>
              <div className="flex flex-wrap items-center justify-between gap-[20px] mb-[20px] md:flex-col md:justify-center">

                {/* ============= Search Input ================= */}
                {/* <div className="flex items-center flex-wrap gap-[20px] md:justify-center">
                  <div className="[&>div>div>span>.ant-select-selection-search-input]:bg-regularBG dark:[&>div>div>span>.ant-select-selection-search-input]:bg-regularBGdark [&>div>div>span>.ant-select-selection-search-input]:h-10 [&>div>div>span>.ant-select-selection-search-input]:border-none [&>div>div>span>.ant-select-selection-search-input>input]:bg-regularBG dark:[&>div>div>span>.ant-select-selection-search-input>input]:bg-transparent min-lg:[&>div>div>span>span>input]:min-w-[350px]">
                    <AutoComplete onSearch={handleSearch} dataSource={searchKeyData} width="100%" patterns />
                  </div>
                </div> */}

                {/* ============= Some Btn ================= */}
                {/* <div className="flex items-center justify-end gap-[6px] md:justify-center">
                  <Button
                    size="small"
                    type="secondary"
                    transparented
                    className="bg-[#5840ff15] h-[38px] px-[13px] text-secondary text-[13px] font-medium rounded-md border-none"
                  >
                    Export
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    className="flex items-center bg-primary h-[38px] gap-[6px] px-[13px] text-white dark:text-white87 text-[13px] font-medium rounded-md border-none"
                  >
                    <UilPlus className="w-[14px] h-[14px]" /> Add Seller
                  </Button>
                </div> */}
              </div>
            </Col>
            <Col md={24}>
              <div className="ant-pagination-custom-style table-responsive table-head-rounded table-th-shape-none table-th-border-none table-last-th-text-right hover-tr-none table-td-border-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none">
                <Table
                  className="[&>div>div>.ant-table]:mb-7 [&>div>div>.ant-table]:pb-5 [&>div>div>.ant-table]:border-b [&>div>div>.ant-table]:border-regular dark:[&>div>div>.ant-table]:border-white10 ltr:[&>div>div>div>div>div>table>thead>tr>th:first-child]:pl-[20px] ltr:[&>div>div>div>div>div>table>tbody>tr>td:first-child]:pl-[20px] rtl:[&>div>div>div>div>div>table>thead>tr>th:first-child]:pr-[20px] rtl:[&>div>div>div>div>div>table>tbody>tr>td:first-child]:pr-[20px] "
                  // rowSelection={rowSelection}
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                />
              </div>
            </Col>
          </Row>
        </GlobalUtilityStyle>
      </div>
    </>
  );
}

export default TourGuide;
