import UserInfo from "./userInfo";

class GroupInfo {
    id:string
    name: string;
    myName: string;
    notice:string;
    remarkName: string;
    member:Array<UserInfo>

    constructor() {
        this.member=new Array<UserInfo>();
    }
}

export default GroupInfo