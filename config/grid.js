import roleType from "../enum/role-type";
import serviceType from "../enum/service-type";

const appointWithMeGrid = {
    rowNum: 5,
    title: '已预约订单',
    extend: '查看全部',
    extendCell: {
        role: roleType.PUBLISHER,
        status: -1,
    },
    gridItems: [
        {
            badge: 'unapproved',
            cell: { role: roleType.PUBLISHER, status: 0 },
            icon: 'operation',
            text: '待处理'
        },
        {
            badge: 'unpaid',
            cell: { role: roleType.PUBLISHER, status: 1 },
            icon: 'file-open',
            text: '待支付'
        },
        {
            badge: 'unconfirmed',
            cell: { role: roleType.PUBLISHER, status: 2 },
            icon: 'complete',
            text: '待确认'
        },
        {
            badge: 'unrated',
            cell: { role: roleType.PUBLISHER, status: 3 },
            icon: 'comment',
            text: '待评价'
        },
        {
            badge: '',
            cell: { role: roleType.PUBLISHER },
            icon: 'tuipiao',
            text: '售后/退款'
        }
    ]
}
const toolsBoxGrid = {
    rowNum: 5,
    title: '推广申请',
    gridItems:[
        {
            badge:'',
            cell:{role: roleType.CUSTOMER},
            icon: 'yonghu',
            text: '回收员招募'
        },
   
    ]
}
const registeProcess = {
    rowNum:4,
    title:"回收员招募",
    gridItems:[
        {
            badge:'',
            cell:{role: roleType.CUSTOMER},
            icon: 'yonghu',
            text: '填写申请'
        },
        {
            badge: 'pending',
            cell: { status: 1 },
            icon: 'operation',
            text: '待审核'
        },
        {
            badge: 'resolve',
            cell: {  status: 2 },
            icon: 'complete',
            text: '已同意'
        },
        {
            badge: 'reject',
            cell: {  status: 3 },
            icon: 'jujue',
            text: '已拒绝'
        }
    ]
}
const myAppointGrid = {
    rowNum: 5,
    title: '我预约的订单',
    extend: '查看全部',
    extendCell: {
        role: roleType.CONSUMER,
        status: -1,
    },
    gridItems: [
        {
            badge: 'unapproved',
            cell: { role: roleType.CONSUMER, status: 0 },
            icon: 'operation',
            text: '待同意'
        },
        {
            badge: 'unpaid',
            cell: { role: roleType.CONSUMER, status: 1 },
            icon: 'file-open',
            text: '待支付'
        },
        {
            badge: 'unconfirmed',
            cell: { role: roleType.CONSUMER, status: 2 },
            icon: 'complete',
            text: '待确认'
        },
        {
            badge: 'unrated',
            cell: { role: roleType.CONSUMER, status: 3 },
            icon: 'comment',
            text: '待评价'
        },
        {
            badge: '',
            cell: { role: roleType.CONSUMER },
            icon: 'tuipiao',
            text: '售后/退款'
        }
    ]
}

const myProvideGird = {
    rowNum: 4,
    title: '我在提供',
    extend: '',
    extendCell: null,
    gridItems: [
        {
            badge: 'pending',
            cell: { type: serviceType.PROVIDE, status: 0 },
            icon: 'time',
            text: '待审核'
        },
        {
            badge: 'unpublished',
            cell: { type: serviceType.PROVIDE, status: 1 },
            icon: 'upload',
            text: '待发布'
        },
        {
            badge: 'published',
            cell: { type: serviceType.PROVIDE, status: 2 },
            icon: 'file-common',
            text: '已发布'
        },
        {
            badge: '',
            cell: { type: serviceType.PROVIDE, status: -1 },
            icon: 'comment',
            text: '查看全部'
        },
    ]
}

const mySeekGrid = {
    rowNum: 4,
    title: '我正在找',
    extend: '',
    extendCell: null,
    gridItems: [
        {
            badge: 'pending',
            cell: { type: serviceType.SEEK, status: 0 },
            icon: 'time',
            text: '待审核'
        },
        {
            badge: 'unpublished',
            cell: { type: serviceType.SEEK, status: 1 },
            icon: 'upload',
            text: '待发布'
        },
        {
            badge: '',
            cell: { type: serviceType.SEEK, status: 2 },
            icon: 'file-common',
            text: '已发布'
        },
        {
            badge: '',
            key: 'unrated',
            slot: 'unrated',
            cell: { type: serviceType.SEEK, status: -1 },
            icon: 'comment',
            text: '查看全部'
        },
    ]
}

export { appointWithMeGrid, myAppointGrid, myProvideGird, mySeekGrid ,toolsBoxGrid,registeProcess}