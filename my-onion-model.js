const ctx = {req: "req", res: "res"}

const middlewareList = [];

function use (fn) {
    middlewareList.push(fn);
}

function run () {
    return function (context, next) {
        return dispatch(0)
        function dispatch (i) {
            let fn = middlewareList[i]
            if (i === middlewareList.length) fn = next
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}

use(async function m1(ctx, next) {
    ctx.req = `${ctx.req}1`
    console.log('m1 req')
    await next();
    console.log('m1 res')
    ctx.res = `${ctx.res}1`
})

use(async function m2(ctx, next) {
    ctx.req = `${ctx.req}2`
    console.log('m2 req')
    await next();
    console.log('m2 res')
    ctx.res = `${ctx.res}2`
})

use(async function m3(ctx, next) {
    ctx.req = `${ctx.req}3`
    console.log('m3 req')
    await next();
    console.log('m3 res')
    ctx.res = `${ctx.res}3`
})

async function start () {
    await run()(ctx, () => {
        ctx.finish = true;
        console.log('处理函数')
    });
    console.log('ctx', ctx)
}

start();
