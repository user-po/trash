const moment = require("../lib/moment")

export const formatTime = function (time) {
    // 把“消息发送时间”转换为 moment 对象
    const sendTime = moment.unix(time);
    // 获取当前时间的 moment 对象
    const now = moment()
    // 调用 moment对象的 diff 方法计算“消息发送时间”距离当前时间多少秒
    const diff = sendTime.diff(now, 'seconds')

    // 如果是距离时间大于等于 0 ，说明是刚刚发送的消息
    if (diff >= 0) {
        return '刚刚'
    }

    // 获取今天 0 点的moment 对象
    const todayStartDate = moment().startOf('day');
    // 如果发送时间在今天 0 点之后，说明是今天的消息，把时间格式化为“时：分”
    if (sendTime.isAfter(todayStartDate)) {
        return sendTime.format('HH:mm')
    }

    // 如果发送时间在今天 0 点之前，按间隔时长来做不同的格式化

    // 发送时间距离今天的时长不足一天，代表是昨天发的消息
    const durationDay = moment.duration(todayStartDate.diff(sendTime)).get('day')
    if (durationDay === 0) {
        return '昨天'
    }

    // 发送时间比当前年份第一天 0 点还早，代表往年的消息，把时间格式化为“年-月-日 时：分”
    const firstDayStartDateOfYear = moment().startOf('year');
    if (sendTime.isBefore(firstDayStartDateOfYear)) {
        return sendTime.format('YYYY-MM-DD HH:mm')
    }

    // 发送时间比当前年份第一天 0 点晚，且距离超过 1 天
    // 说明是年内其他日期的消息，把时间格式化为“月-日 时：分”
    return sendTime.format('MM-DD HH:mm')
}