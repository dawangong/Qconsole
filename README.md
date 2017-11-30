### Qconsole下命令的外部输出

JS原生中默认是没有console对象,这是宿主对象（也就是游览器）提供的内置对象。 用于访问调试控制台, 在不同的浏览器里效果可能不同。比如：现在大部分的游览器都是带有调试功能的。而低版本的IE就没有，所以在低版本IE的window中，console对象并不存在。也就无法基于console对象来构建这个小工具。

对于js的调试，一般我们经常用alert()或者console.log()进行调试。但是alert()会让程序中断，而console.log()则不会。

为了调试方便，对console下的对象下log、info、warn、error、debug方法进行浅层重写。

你只需引入这个js文件，然后new一个新的Consoles实例对象就ok了。

