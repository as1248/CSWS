import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import NewInboundRule from "./NewInboundRule";
import ExistingInboundRule from "./ExistingInboundRule";

const EditInboundRules = () => {
    const navigate = useNavigate();
    const {instanceId,securityGroupId} = useParams();
    const [id, setId] = useState(1);
    const [data,setData] = useState([{
        Id:'0',
        type:'1',
        protocol:'1',
        port:'1',
        CIDR:'1',
    }]);

    const [newData, setNewData] = useState([]);
    const addData = () => {
        setNewData((prev) => [...prev,{
        Id:id,
        type:'2',
        protocol:'2',
        port:'2',
        CIDR:'2',
        }]);
        setId((prev)=>prev+1);
    };
    
    const saveRules = () => {
      console.log('새로운 규칙은 POST요청, 삭제할 규칙은 DELETE요청');
    };
    return (
        <>
          <Title>인바운드 규칙 편집</Title>
            <Container>
                <Rules>
                <tbody>
                <tr>
                    <RulesHeader style={{width:'12vw', minWidth:'150px'}}>보안 그룹 ID</RulesHeader>
                    <RulesHeader style={{width:'12vw', minWidth:'150px'}}>유형</RulesHeader>
                    <RulesHeader style={{width:'5vw', minWidth:'80px'}}>프로토콜</RulesHeader>
                    <RulesHeader style={{width:'6vw', minWidth:'100px'}}>포트 범위</RulesHeader>
                    <RulesHeader style={{width:'12vw', minWidth:'150px'}}>CIDR 블록</RulesHeader>
                    <th> </th>
                </tr>
                {data.map((i)=>{
                    return(<ExistingInboundRule data={data} setData={setData} i={i} key={i.Id}/>)})
                }
                {newData.map((i)=>{
                    return(<NewInboundRule data={newData} setData={setNewData} i={i} key={i.Id}/>)})
                }
                </tbody>
                </Rules>
            </Container>
            <BtnSection>
            <AddRule onClick={()=>addData()}>규칙 추가</AddRule>
            <div>
                <Cancel onClick={() => navigate(`/dashboard/${instanceId}/${securityGroupId}`)}>취소</Cancel>
                <SaveRules onClick={()=>navigate(`/dashboard/${instanceId}/${securityGroupId}`)}>인바운드 규칙 저장</SaveRules>
            </div>
          </BtnSection>
        </>
    );
};

export default EditInboundRules;

const Container = styled.div`
display: flex;
width: 100%;
min-width: 900px;
margin: 3% 0;
box-shadow: 2px 2px #dbdfe0;
background-color: #fafafa;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const Rules = styled.table`
  width: 100%;
  border-spacing: 3vw;
`;

const RulesHeader = styled.th`
  text-align: left;
  margin-right: 5vw;
`;

const BtnSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddRule = styled.span`
  cursor: pointer;
  border: 0.5px solid #879596;
  height: 25px;
  padding: 4px 15px;
  background-color: white;
  font-weight: 600;
  &:hover{
    background-color: #fafafa;
    color: black;
  }
`

const SaveRules = styled.span`
  cursor: pointer;
  margin-left: 20px;
  padding: 4px 15px;
  background-color: #ec7211;
  color: white;
  font-weight: 600;
  &:hover{
    background-color: #eb5f07;
  }
`;

const Cancel = styled.span`
  cursor: pointer;
  padding: 4px 15px;
  &:hover{
    background-color: white;
    color: black;
  }
`;