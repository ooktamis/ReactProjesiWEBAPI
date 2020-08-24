import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';
export class Department extends Component {
    constructor (props){
        super(props);
        this.state = {deps:[], addModalShow : false, editModalShow : false}
    }
    componentDidMount(){
        this.refreshList();
    }
    refreshList(){
        fetch('http://localhost:59470/api/department')
        .then(response=> response.json())
        .then(data => {
            this.setState({deps:data});
        });
    }
    componentDidUpdate(){//bu method yeni ekleme olduğunda sayfayı refresh ediyor.
        this.refreshList();
    }
    DeleteDep(depid){
        if(window.confirm('Silmek istediğinize eminmisiniz?')){
            fetch('http://localhost:59470/api/department/'+depid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }
    render(){
        
        const{deps, depid, depname}=this.state;
        let addModalClose =() => this.setState({addModalShow : false});
        let editModalClose =() => this.setState({editModalShow : false});
        return(<div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>DepartmentID</th>
                        <th>DepartmentName</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep=>
                        <tr key= {dep.DepartmentID}>
                            <td>{dep.DepartmentID}</td>
                            <td>{dep.DepartmentName}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button
                                    className="m-2" variant="info"
                                    onClick= {()=> this.setState({editModalShow: true, 
                                        depid:dep.DepartmentID,
                                        depname:dep.DepartmentName
                                    })}
                                    >
                                        Edit
                                    </Button>
                                    <Button className="m-2" variant="info"
                                    onClick={()=> this.DeleteDep(dep.DepartmentID)}
                                    variant="danger"
                                    >
                                        Delete
                                    </Button>
                                    <EditDepModal
                                    show = {this.state.editModalShow}
                                    onHide={editModalClose}
                                    depid= {depid}
                                    depname = {depname}
                                    />
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button 
                variant='primary' 
                onClick={()=> this.setState({addModalShow: true})}>
                        Add Department
                </Button>
                <AddDepModal 
                show={this.state.addModalShow } 
                onHide={addModalClose}/>
            </ButtonToolbar>
        </div>)
        
    }
}
//2. Adım olarak Bu sayfayı yaptık . App sayfasında çağırdık.


//state : değeri değişecek olan veriler için kullanılır. Değeri değişicek ise state kullanılırız.
//state olusturduk içine dizi tanımladık bu diziyi refresh deki datas doldurduk.
//const ise gelen datanın değişmeyecğini göstermek için tanımladık.