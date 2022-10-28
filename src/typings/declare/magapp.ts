// 分享平台：(ALL)全部 WEIXIN(微信好友)WEIXIN_CIRCLE(微信朋友圈)QQ(QQ)QZONE(QQ空间)WEIBO(新浪)
type SharePlatformList = "ALL"
  | "WEIXIN"
  | "WEIXIN_CIRCLE"
  | "QQ"
  | "QZONE"
  | "WEIBO";

// 页面设置配置
interface setDataOptions {
  shareData?: {
    // 标题
    title: string;
    // 描述
    desc: string;
    // 分享图标URL
    picurl: string;
    //分享图标
    linkurl: string
    // 分享类型 1=图片分享 默认URL
    type?: number
    // 若type=1 设置分享出去的图片
    imageurl?: string;
  }
}

// 图片
interface UploadPicConfig {
  // 选择/拍照成功后回调。上传中
  preview: (res: object) => void;
  // 上传成功回调
  success: (res: object) => void;
  // 上传失败回调
  fail: (res: object) => void;
}

// 预览图片
interface PreviewImageConfig {
  // 图片索引
  current: number;
  // 图片列表
  pics: string[];
}

// 对话框
interface DialogConfig {
  // 标题
  title: string;
  // 内容
  content: string;
  // 确认取消操作按钮,最多两个
  buttons: string[];
  // 点击第二个按钮回调
  success: () => void;
  // 点击第一个按钮回调
  cancel: () => void;
}

// 生命周期配置
interface PageLifeConfig {
  pageAppear: () => void;
  pageDisappear: () => void;
}

// 支付配置
interface PayConfig {
  // 金额
  money: string;
  // 标题
  title: string;
  // 描述
  des: string;
  // 支付类型 0=不允许 1=允许
  payWay: {
    // 钱包
    wallet: 0 | 1;
    // 微信
    weixin: 0 | 1;
    // 支付宝
    alipay: 0 | 1;
  }
  // 订单号
  orderNum: string;
  // 联合订单号
  unionOrderNum: string;
  // 支付类型
  type: string
}

// 唤起聊天
interface ChatConfig {
  // 用户id
  user_id: string;
  // 用户名
  user_name: string;
}

// 打开外部应用
interface NewExternalWinConfig {
  // 外部应用包名
  package: string;
}

// 分享卡片
interface ShareCardConfig {
  // 分享标题
  title: string;
  // 分享图片
  pic: string;
  // 二维码对应的URL
  url: string;
  // 分享页面导航地址 默认"分享"
  naviTitle?: string;
  // 描述
  des: string;
  // 分享平台
  platform: SharePlatformList;
}

declare namespace mag {

  /**
   * 加载完成MagAPP-JSSDK执行
   * @param callback
   */
  function ready(callback: () => void): void;

  /**
   * 设置页面信息
   * @param options
   */
  function setData(options: setDataOptions): void;

  /**
   * 分享
   * @param platform 平台
   * @param success 成功回调
   * @param error  失败回调
   */
  function share(platform: SharePlatformList, success: (res: object) => void, error: (res: object) => void): void;

  /**
   * 拍照
   * @param config
   */
  function camera(config: UploadPicConfig): void;

  /**
   * 从相册选择图片
   * @param config
   */
  function picPick(config: UploadPicConfig): void;

  /**
   * 预览图片
   * @param config
   */
  function previewImage(config: PreviewImageConfig): void;

  /**
   * 获取经纬度
   * @param success 成功回调
   */
  function getLocation(success: (res: object) => void): void;

  /**
   * 调用手机地图获取位置信息
   * @param success 成功回调
   */
  function mapPick(success: (res: object) => void): void;

  /**
   * 扫二维码
   * @param success 成功回调 text=扫描结果文本
   */
  function scanQR(success: (text: string) => void): void;

  /**
   * 显示加载框
   */
  function progress(): void;

  /**
   * 隐藏加载框
   */
  function hideProgress(): void;

  /**
   * 对话框
   * @param config
   */
  function dialog(config: DialogConfig): void;

  /**
   * 单选菜单
   * @param actions 可选
   * @param callback 回调 index:选中的索引值
   */
  function actionSheet(actions: string[], callback: (index: number) => void): void;

  /**
   * toast提示
   * @param text 提示文本
   */
  function toast(text: string): void;

  /**
   * 跳转个人中心
   * @param user_id 用户id
   */
  function toUserHome(user_id: string): void;

  /**
   * 根据用户名跳转个人中心
   * @param user_name
   */
  function toUserHomeByName(user_name: string): void;

  /**
   * 获得可用的分享平台
   * @param callback
   */
  function availableSharePlatform(callback: (res: object) => void): void;

  /**
   * 打开外部应用
   * @param config
   */
  function newExternalWin(config: NewExternalWinConfig): void;

  /**
   * 卡片分享
   * @param config
   * @param success
   * @param fail
   */
  function shareCard(config: ShareCardConfig, success: (res: object) => void, fail: (res: object) => void): void;

  /**
   * 唤起聊天窗口
   * @param config
   */
  function chat(config: ChatConfig): void;

  /**
   * 新窗口打开页面
   * @param url URL地址
   * @param param URL参数
   */
  function newWin(url: string, param: object): void;

  /**
   * 关闭页面
   */
  function closeWin(): void;

  /**
   * 配置页面生命周期回调
   * @param config
   */
  function setPageLife(config: PageLifeConfig): void;

  /**
   * 用户登录
   * @param success 成功回调
   */
  function toLogin(success: (res: {
    token: string,
    name: string,
    sex: string,
    user_id: string,
    head: string,
  }) => void): void;

  /**
   * 绑定手机号
   * @param callback phone:用户绑定成功后返回的手机号
   */
  function phoneBind(callback: (phone: string) => void): void;

  /**
   * 设置标题
   * @param title
   */
  function setTitle(title: string): void;

  /**
   * 显示导航
   */
  function showNavigation(): void;

  /**
   * 隐藏导航
   */
  function hideNavigation(): void;

  /**
   * 设置导航颜色
   * @param color
   */
  function setNavigationColor(color: string): void;

  /**
   * 隐藏导航栏右上角更多操作按钮
   */
  function hideMore(): void;

  /**
   * 显示导航栏右上角更多操作按钮
   */
  function showMore(): void;

  /**
   * 打电话
   * @param phone 手机号
   */
  function tel(phone: string): void;

  /**
   * 发送短信
   * @param phone 手机号
   * @param text 内容
   */
  function sms(phone: string, text: string): void;

  /**
   * 调用支付宝
   * @param payStr  支付配置
   * @param success 成功回调
   * @param fail 失败回调
   */
  function alipay(payStr: string, success: (res: object) => void, fail: (res: object) => void): void;

  /**
   * 调用支付
   * @param config 支付心心
   * @param success 成功回调
   * @param fail 失败回调
   */
  function pay(config: PayConfig, success: (res: object) => void, fail: (res: object) => void): void;

}

declare module 'mag' {
  export = mag;
}