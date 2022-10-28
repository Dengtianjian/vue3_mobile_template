import Dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/zh-cn';

Dayjs.extend(relativeTime);
Dayjs.locale("zh-cn");

export default Dayjs;