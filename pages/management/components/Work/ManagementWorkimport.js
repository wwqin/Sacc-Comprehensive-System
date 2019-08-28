import React from 'react';
import { connect } from 'react-redux';
import { Select, Form, Switch, Icon, Checkbox, Input, Button, Slider, Steps, Divider, InputNumber, TimePicker, TreeSelect} from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

const treeData = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'Child Node1',
          value: '0-0-0',
          key: '0-0-0',
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
      children: [
        {
          title: 'Child Node3',
          value: '0-1-0',
          key: '0-1-0',
        },
        {
          title: 'Child Node4',
          value: '0-1-1',
          key: '0-1-1',
        },
        {
          title: 'Child Node5',
          value: '0-1-2',
          key: '0-1-2',
        },
      ],
    },
  ];

  const { SHOW_PARENT } = TreeSelect;

class ManagemenWorkimport extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current:0,
            error:'',
            fromTable:{
                Name:'',
                List:['0-0-0'],
                Place:'',
                Time:'',
                Content:''
            }
        }
        this.onCheck = this.onCheck.bind(this);
    }

    changeName = value =>{
        this.setState({
            fromTable:{
                ...this.state.fromTable,
                Name:value
            }
        })
    };

    changeContent = value => {
        this.setState({
            fromTable:{
                ...this.state.fromTable,
                Content:value
            }
        })
    };

    changePlace = value => {
        this.setState({
            fromTable:{
                ...this.state.fromTable,
                Place:value
            }
        })
    }

    onCheck(){
        if(this.state.fromTable.Name=='')
        {
            this.setState({ current:0,error:'error' });
            return;
        }
        else
            this.setState({ current:1,error:'' });
        if(this.state.fromTable.type=='')
        {
            console.log(this.state.fromTable.type)
            this.setState({ current:1,error:'error' });
            return;
        }
        else
            this.setState({ current:2,error:'' });
        if(this.state.fromTable.isCheckbos=='')
        {
            this.setState({ current:2,error:'error' });
            return;
        }
        else
            this.setState({ current:3,error:'' });
        if(this.state.fromTable.Content=='')
        {
            this.setState({ current:3,error:'error' });
            return;
        }
        else
            this.setState({ current:4,error:'' });
        let Aflag=false,Sflag=true;
        this.state.fromTable.answers.map((item) => {if(item) Aflag=true});
        this.state.fromTable.Selects.map((item) => {if(!item) Sflag=false});
        if(!Aflag&&!Sflag)
        {
            this.setState({ current:4,error:'error' });
            return;
        }
        else
            this.setState({ current:5,error:'' });
        if(this.state.fromTable.Score=='')
        {
            this.setState({ current:5,error:'error' });
            return;
        }
        else
            this.setState({ current:6,error:'success' });
    };

    onChange = value => {
        this.setState({
             fromTable:{
                 ...this.state.fromTable,
                 List:value
             } 
            });
    };

    render(){
        const { current } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const tProps = {
            treeData,
            value: this.state.fromTable.List,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
              width: 400,
            },
          };
        return (
            <div>
                <Steps current={current} status={this.state.error}>
                    <Step title="Step 1" description="练习名称." />
                    <Step title="Step 2" description="练习地点." />
                    <Step title="Step 3" description="练习时间." />
                    <Step title="Step 4" description="注意事项." />
                    <Step title="Step 5" description="题目列表." />
                </Steps>
                <Divider />
                <Form {...formItemLayout}>
                    <Form.Item label="练习名称" hasFeedback>
                        <Input placeholder="请输入练习名称" onChange={this.changeName} value={this.state.fromTable.Name} onBlur={this.onCheck}/>
                    </Form.Item>
                    <Form.Item label="练习地点" hasFeedback>
                        <Input placeholder="请输入练习地点" onChange={this.changePlace} value={this.state.fromTable.Place} onBlur={this.onCheck}/>
                    </Form.Item>
                    <Form.Item label="练习时间" hasFeedback>
                    <InputNumber min={2019} max={2040} defaultValue={2019} style={{width:85}}/>年<InputNumber min={1} max={12} style={{width:55}}/>月<InputNumber min={1} max={31} style={{width:55}}/>日
                        <TimePicker />~<InputNumber min={2019} max={2040} defaultValue={2019} style={{width:85}}/>年<InputNumber min={1} max={12} style={{width:55}}/>月<InputNumber min={1} max={31} style={{width:55}}/>日<TimePicker />
                    </Form.Item>
                    <Form.Item label="注意事项" hasFeedback>
                        <TextArea rows={4} onChange={this.changeContent} value={this.state.fromTable.Content}  onBlur={this.onCheck}/>
                    </Form.Item>
                    <Form.Item label="题目列表" hasFeedback>
                        <TreeSelect {...tProps} />
                    </Form.Item>
                    <Button type="primary" style={{left:'50%',transform:'translateX(-50%)'}}>确认提交</Button>
                </Form>
            </div>      
        )
    }
}
const mapStateToProps = (state) =>{
	return {
		
	}
}
const mapDispatchToProps = (dispatch) => {
	return {

	}
}
export default connect(mapStateToProps,mapDispatchToProps)(ManagemenWorkimport);