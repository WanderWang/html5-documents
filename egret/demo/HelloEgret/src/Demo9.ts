/**
 * 资源 Demo
 */
class Demo9 extends egret.DisplayObjectContainer{

    /**加载进度界面*/
    private loadingView:LoadingUI;
    /**测试用的位图*/
    private logo:egret.Bitmap;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.startGame,this);
    }

    /**游戏启动后，会自动执行此方法*/
    public startGame():void {
        //-------------------设置屏幕适配策略
        //获取游戏在所处的环境中的容器（环境不同，容器也不同）
        var container = new egret.EqualToFrame();
        //下面设定的是游戏的运行尺寸，为了桌面调试方便，下面进行了一个判断，如果是移动设备，则设置尺寸为和浏览器同等宽度；如果是
        //桌面浏览器，则设置一个固定宽度
        //您可以修改FixedSize()的尺寸，来观察实际效果
        var content = egret.Browser.getInstance().isMobile ? new egret.FixedWidth() : new egret.FixedSize(480, 800);
        //创建策略对象
        var policy = new egret.ResolutionPolicy(container, content);
        //所谓DesignSize，就是您设计游戏UI时候所依据的分辨率，因为通常情况下我们不可能为所有分辨率设计不同的UI，只能设计一到两种，
        //然后通过缩放来适应所有的情况。所以下面的设定，请和您设计的素材依据的分辨率保持一致。
        egret.StageDelegate.getInstance().setDesignSize(480, 800, policy);

        //--------------------资源加载
        //使用RES模块，侦听GROUP_COMPLETE事件和GROUP_PROGRESS事件，可以同步显示加载进度，并继续执行加载完成后的逻辑
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        //如果存在多套不同分辨率的资源，您可以使用assets/480/,assets/640/这样的方式来设计素材目录结构加以区分，
        RES.loadConfig("resource/resource.json","resource/");//加载资源配置文件
        RES.loadGroup("preload");//加载某个资源group

        //-------------------设置加载进度界面
        this.loadingView  = new LoadingUI();
        this.stage.addChild(this.loadingView);
    }
    /**preload资源组加载进度*/
    private onResourceProgress(event:RES.ResourceEvent):void {
        this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
    }
    /**显示*/
    private onResourceLoadComplete():void {
        this.stage.removeChild(this.loadingView);
        this.logo = new egret.Bitmap();//创建位图
        this.logo.texture = RES.getRes("egretIcon");//设置纹理
        this.addChild(this.logo);//添加到显示列表
    }

}