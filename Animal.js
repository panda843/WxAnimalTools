//餐厅颜色
const BG_COLOR_RESTAURANT = '#ffccb07c';
//花园颜色
const BG_COLOR_GARDEN = '#ffcfc169';
//厨房颜色
const BG_COLOR_KITCHEN = '#ffd3c088';
//提示确认颜色
const BG_COLOR_NOTICE = '#ffffd055';
//小费提示颜色
const BG_COLOR_GRATUITY = '#fff9f5e8';
//菜单被覆盖颜色
const BG_COLOR_MENU_COVER = '#ff876e2d';
//双倍按钮->直接领取
const BG_COLOR_DOUBLE_NO = '#ffe9d2bf';
//歌手颜色
const BG_COLOR_SINGER = '#ffe89781';

var Animal= function(){

    var current_bg_color = '';

    var is_run = false;

    //检查餐厅颜色是否匹配
    this.isRestaurant = () => {
        var img = captureScreen();
        var color = images.pixel(img, device.width-500, device.height/7);
        if(colors.toString(color) == BG_COLOR_RESTAURANT){
            this.current_bg_color = BG_COLOR_RESTAURANT;
            return true;
        }else{
            return false;
        }
    }
    //检查花园颜色是否匹配
    this.isGarden = () => {
        var img = captureScreen();
        var color = images.pixel(img, device.width-100, 150);
        if(colors.toString(color) == BG_COLOR_GARDEN){
            this.current_bg_color = BG_COLOR_GARDEN;
            return true;
        }else{
            return false;
        }
    }
    //检查厨房颜色是否匹配
    this.iskitchen = () => {
        var img = captureScreen();
        var color = images.pixel(img, device.width/2, 480);
        if(colors.toString(color) == BG_COLOR_KITCHEN){
            this.current_bg_color = BG_COLOR_KITCHEN;
            return true;
        }else{
            return false;
        }
    }
    //查看菜单按钮是否存在
    this.checkAnimalMenu = function(){
        var img = captureScreen();
        var color = images.pixel(img, 100,device.height-82);
        if(colors.toString(color) == BG_COLOR_NOTICE || colors.toString(color) == BG_COLOR_MENU_COVER){
            return true;
        }else{
            return false;
        }
    };
    this.checkDoubleNotice = (isDouble) => {
        toast("进行double检查");
        sleep(200);
        var img = captureScreen();
        //检查是否是双倍
        var color = images.pixel(img, 350, device.height-790);
        if(colors.toString(color) == BG_COLOR_DOUBLE_NO){
            toast("检查到double");
            if(!isDouble){
                click(350, device.height-790)
            }
            return true;
        }else{
            return false;
        }
    }
    //检查小费
    this.checkGratuity = (isGet) => {
        var img = captureScreen();
        var color = images.pixel(img, 445,675);
        if(colors.toString(color) == BG_COLOR_GRATUITY){
            toast("检测到小费,并点击获取");
            if(isGet){
                click(445,675);
                this.checkDoubleNotice(false);
            }
            return true;
        }else{
            return false;
        }
    }
    //检查歌手
    this.checkSinger = (isGet) => {
        var img = captureScreen();
        var color = images.pixel(img, device.width-205,620);
        if(colors.toString(color) == BG_COLOR_SINGER){
            toast("检测到歌手,并点击歌手");
            if(isGet){
                for(var i=0;i<20;i++){
                    press(device.width-205,620, 200);
                }
            }
            return true;
        }else{
            return false;
        }
        // dialogs.build({
        //     title: colors.toString(color)
        // }).show();
    };
    //检查提示窗口&并关闭
    this.checkNotice = () => {
        var img = captureScreen();
        toast("检查到窗口提示,直接关闭");
        var color = images.pixel(img, device.width/2,device.height-770);
        if(colors.toString(color) == BG_COLOR_NOTICE){
            click(device.width/2,device.height-770);
        }
    }
    //点击菜单
    this.clickMenu = function(){
        if(this.checkAnimalMenu()){
            click(120,device.height-100);
        }
    }
    //切换页面
    this.switchPage = function(target){
        toast("滑动页面 -> "+target);
        // swipe (device.width/2,100,device.width/2,800,1000); //上到下
        // swipe (device.width-100,device.height/2,device.width/2,device.height/2,200); //右到左
        //当前页为花园
        if(this.current_bg_color == BG_COLOR_GARDEN){
            switch(target){
                case BG_COLOR_KITCHEN:
                        swipe(device.width-100,device.height/2,device.width/2,device.height/2,200);
                        this.current_bg_color = BG_COLOR_RESTAURANT;
                        sleep(300);
                        swipe(device.width-100,device.height/2,device.width/2,device.height/2,200);
                        this.current_bg_color = BG_COLOR_KITCHEN;
                    break;
                case BG_COLOR_RESTAURANT:
                        swipe(device.width-100,device.height/2,device.width/2,device.height/2,200);
                        this.current_bg_color = BG_COLOR_RESTAURANT;
                    break;    
                default:
                    break;    
            }
        }else if(this.current_bg_color == BG_COLOR_KITCHEN){
            //当前页为厨房
            switch(target){
                case BG_COLOR_GARDEN:
                        swipe (100,device.height/2,device.width/2,device.height/2,200);
                        this.current_bg_color = BG_COLOR_RESTAURANT;
                        sleep(300);
                        swipe (100,device.height/2,device.width/2,device.height/2,200);
                        this.current_bg_color = BG_COLOR_GARDEN;
                    break;
                case BG_COLOR_RESTAURANT:
                        swipe (100,device.height/2,device.width/2,device.height/2,200);
                        this.current_bg_color = BG_COLOR_RESTAURANT;
                    break;   
                default:
                    break;    
            }
        }else if(this.current_bg_color == BG_COLOR_RESTAURANT){
            //当前页为餐厅
            switch(target){
                case BG_COLOR_GARDEN:
                        swipe (100,device.height/2,device.width/2,device.height/2,200);
                        this.current_bg_color = BG_COLOR_GARDEN;
                    break;
                case BG_COLOR_KITCHEN:
                        swipe(device.width-100,device.height/2,device.width/2,device.height/2,200);
                        this.current_bg_color = BG_COLOR_KITCHEN;
                    break;   
                default:
                    break;    
            }
        }
    }
    //创建测试点
    this.createTestDot = function(x,y){
        var dot = floaty.rawWindow(
            <frame h="*" w="*">
                <button h="2" w="2" id="dot" rotation="45" text="" bg="#FF3030" />
            </frame>
        );
        //设置悬浮窗位置
        dot.setPosition(x, y);
        //5秒后移除
        setTimeout(() => {
            dot.close();
        }, 5000);
    }
    //获取当前点击位置
    this.getCurrentClickPos = function(){
        var $this = this;
        toast("进入屏幕点击监听事件");
        events.observeTouch();
        //注册触摸监听器
        events.onTouch(function(p){
            //触摸事件发生时, 打印出触摸的点的坐标
            toast("当前点击位置:"+p.x + "," + p.y);
            $this.createTestDot(p.x, p.y);
        });
        
    }
    this.workStart = function(){
        var $this = this;
        threads.start(function(){
            //在新线程执行的代码
            while(true){
                //检查弹窗
                $this.checkNotice();
                //餐厅
                if($this.isRestaurant()){
                    //检查小费&点击
                    $this.checkGratuity(true);
                    //检查歌手
                    $this.checkSinger(true);
                }
                //厨房
                if($this.iskitchen()){

                }
                //花园
                if($this.isGarden()){

                }
                //toast("开始长按事件:"+x+","+y+","+time);
                press(device.width-150, device.height-170, 50000);
            }
        });
    }
    //音量UP按下
    this.volumeUp = function(event){
        if(!this.is_run){
            if(this.checkAnimalMenu()){
                toast("脚本开始运行了");
                this.is_run = true;
                this.workStart();
            }else{
                toast("请先打开动物餐厅");
            }
        }else{
            toast("脚本已经在运行了.");
        }
    }
    //音量DOWN按下
    this.volumeDown = function(event){
        toast("脚本停止运行了");
        //改变状态为close
        this.is_run = false;
        //关闭所有子进程
        threads.shutDownAll();
        //移除屏幕点击监听事件
        events.removeAllTouchListeners();
    }
    //程序初始化
    this.initEvents = function(){
        if(!requestScreenCapture(false)){
            toast("获取截图权限失败,中断操作");
            exit();
        }
        //屏蔽原音量键功能
        events.setKeyInterceptionEnabled("volume_up", true);
        events.setKeyInterceptionEnabled("volume_down", true);
        //启用按键监听
        events.observeKey();
        //监听音量上键按下
        events.onKeyDown("volume_up", this.volumeUp.bind(this));
        //监听音量下键按下
        events.onKeyDown("volume_down", this.volumeDown.bind(this));
        //设置屏幕适配
        setScreenMetrics(1080, 2160);
    }
}
var animal = new Animal();
animal.initEvents();
