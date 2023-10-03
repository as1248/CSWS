import styled from "styled-components";
import Header from "../../components/Header";
import InstanceDescription from "../../components/Instance/InstanceDetail/InstanceDescription";
import TabsContent from "../../components/Instance/InstanceDetail/TabsContent";
import Navigation from "../../components/Navigation";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";

const InstanceDetail = () => {
  const [instanceDetail,setInstanceDetail] = useState();
  const [domainName,setDomainName] = useState('');
  const {instanceId} = useParams();
  //인스턴스 상세
  useEffect(()=>{
      try {
        axios.get(`/instances/detail?instanceId=${instanceId}`).then((response)=> setInstanceDetail(response.data));
      } catch (error) {
        console.error(error);
      }
  },[instanceId]);
  //인스턴스 도메인
  useEffect(()=>{
      try {
        axios.get(`/instances/domain?instanceId=${instanceId}`).then((response)=> setDomainName(response.data.domainName));
      } catch (error) {
        console.error(error);
      }
  },[instanceId]);

    return (
      <>
        <Header/>
        <Content>
          <Navigation/>
          <InstanceDescription data={instanceDetail} domainName={domainName} setInstanceDetail={setInstanceDetail}/>
          <TabsContent data={instanceDetail} domainName={domainName} setDomainName={setDomainName}/>
        </Content>
      </>
    );
};

export default InstanceDetail;
const Content = styled.div`
  padding: 0 5%;
  min-height: 80vh;
  margin-bottom: 120px;
`;