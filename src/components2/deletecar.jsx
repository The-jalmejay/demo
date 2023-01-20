import React,{Component} from "react";
import httpService from "./httpService";
class Delete extends Component{
    async componentDidMount(){
        const{id}=this.props.match.params;
        console.log(id);
        let response= await httpService.deleteApi(`/cars/${id}`);
        this.props.history.push("/cars")
    };
    render(){
        return "";
    }
};
export default Delete;