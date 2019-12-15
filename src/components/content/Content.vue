<template>
  <div>
    <div class=" bg-content shadow-sm border-gray border rounded mb-3 content"  v-for="(article, index) in articles" :key="index">
      <div class="card-title"><a href="#" class="badge">爬虫</a>标题做爬虫的同学肯定或多或少会为验证码苦恼过做爬虫的同学肯定或多或少会为验证码苦恼过做爬虫的同学肯定或多或少会为验证码苦恼过</div>
      <div class="card-bottom">
        <div class="card-bottom-left col-sm-3 col-3">
          <img class="img-thumbnail image-responsive" src="https://cuiqingcai.com/wp-content/themes/Yusi/timthumb.php?src=https://qiniu.cuiqingcai.com/wp-content/uploads/2015/09/wallpaper_5265780-e1454442805684.jpg&h=123&w=200&q=90&zc=1&ct=1" alt="">
        </div>
        <div class="card-bottom-right col-sm-9 col-9 pl-sm-3">
          <div class="articl">
            做爬虫的同学肯定或多或少会为验证码苦恼过，在最初的时候，大部分验证码都是图形验证码。但是前几年「极验」验证码横空出世，行为验证码变得越来越流行，其中之一的形式便是滑块验证码。 滑块验证码是怎样的呢？如图所示，验证码是一张矩形图，图片左侧会出现一个滑块，右侧会出现一个缺口，下侧会出
          </div>
          <div class="tools">
            <i class="fa fa-clock-o"></i><span>2019/11/14 19:31:02</span>
            <i class="fa fa-eye"></i><span>234</span>
            <i class="fa fa-comments"></i><span>12</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article1',
  data () {
    return {
      articles: [
        { name: '' },
        { name: '' },
        { name: '' },
        { name: '' }
      ]
    }
  }
}
</script >

<style lang="less" scoped>
.content {
  text-align: left;
  line-height: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
   padding: .7rem 1.1rem;
   color: #6c757d;
   .card-title {
     font-size: 1.1rem;
     line-height: 1.5rem;
     color: #2e3641;
      word-break:break-all;//强制换行
      text-overflow:ellipsis;//显示为省略号
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
      overflow: hidden;
   }
   .card-title a:first-of-type {
     margin-right: 1rem;
     background-color: #D33632;
     color: white;
   }
   .card-title:hover {
     color: #0d8a72;
   }
  .card-bottom {
    display: flex;
    flex-direction: row;
    .card-bottom-left {
      width: 12.5rem;
      height: 7.6rem;
      background: blueviolet;
      overflow: hidden;
      padding: 0;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -o-transition: all 0.5s;
        transform: scale(1);
      }
    }
    .card-bottom-right {
      padding: 0;
      flex: 1;
      padding-left: 1rem;
      background-clip: content-box;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .articl {
        font-size: .9rem;
        word-break:break-all;//强制换行
        text-overflow:ellipsis;//显示为省略号
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:4;
        overflow: hidden;
      }
      .tools {
        font-size: .85rem;
        color: silver;
        text-align: right;
        i {
          margin: 0 .2rem 0 .3rem;
        }
        span {
          margin-right: .9rem;
        }
      }
    }
  }
  // 鼠标经过card-bottom时card-bottom-left img变形
  .card-bottom:hover .card-bottom-left img {
    -moz-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }
}
@media screen and(max-width: 767px) {
  .content {
    font-size: .9rem;
    .card-bottom {
      .card-bottom-left {
        width: 7.5rem;
        height: 4.5rem;
      }
      .card-bottom-right {
        .articl {
          font-size: .9rem;
          word-break:break-all;//强制换行
          text-overflow:ellipsis;//显示为省略号
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:3;
          overflow: hidden;
        }
        .tools {
          display: none;
        }
      }
    }
  }
}
</style>
