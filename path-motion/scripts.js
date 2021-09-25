if (typeof ScrollTrigger !== typeof undefined) {
    gsap.registerPlugin(ScrollTrigger);
}

const gsapAnimate = {
    getData: (elem) => {
        const option = {
            opacity: 0,
            scale: 1,
            position: {
                x: 0,
                y:0,
            },
            ease: "",
            duration: 1,
            delay: .4,
            rotate: 0
        }
        if(elem !== undefined) {
            option.position.x = gsapAnimate.validValue(elem.dataset.iqPositionX, 0)

            option.position.y = gsapAnimate.validValue(elem.dataset.iqPositionY, 0)

            option.rotate = gsapAnimate.validValue(elem.dataset.iqRotate, 0)

            option.scale = gsapAnimate.validValue(elem.dataset.iqScale, 1)

            option.opacity = gsapAnimate.validValue(elem.dataset.iqOpacity, 0)

            option.delay = gsapAnimate.validValue(elem.dataset.iqDelay, .4)

            option.duration = gsapAnimate.validValue(elem.dataset.iqDuration, 1.5)

            option.ease = gsapAnimate.validValue(elem.dataset.iqEase, '')

            const setOption = {opacity: option.opacity, scale: option.scale, x: option.position.x, y: option.position.y, ease: option.ease, rotate: option.rotate, duration: option.duration, delay: option.delay}

            if (typeof ScrollTrigger !== typeof undefined) {
                if (elem.dataset.iqTrigger == 'scroll') {
                    const scrub = elem.dataset.iqScrollScrub === 'true' ? true : false

                    setOption.scrollTrigger = {
                    trigger: elem,
                    start: () => "top 90%",
                    end: () => "bottom 10%",
                    scrub: scrub,
                    markers: false
                    }
                }
            }

            return setOption
        } else {
            return {opacity: 0}
        }
    },
    onStart : (elem) => {
        
        const setOption = gsapAnimate.getData(elem)

        gsap.from(elem, setOption)

    },

    onEnd : (elem) => {
        
        const setOption = gsapAnimate.getData(elem)
        
        gsap.to(elem, setOption)

    },

    onStartEnd : (elem) => {

        const setOption = gsapAnimate.getData(elem)

        const setEndOption = gsapAnimate.getData(elem)

        setEndOption.opacity = 1

        setEndOption.x = 0

        setEndOption.y = 0

        setEndOption.rotate = 0

        setEndOption.scale = 1

        gsap.fromTo(elem, setOption, setEndOption)
    },
    validValue: (attr, defaultVal) => {
        if (attr !== undefined && attr !== null) {
            return Number(attr)
        }
        return Number(defaultVal)
    }
}


function animationInit() {

    const gsapElem = document.querySelector('.swiper .swiper-slide-active').querySelectorAll('[data-iq-gsap="onStart"]')

    Array.from(gsapElem, (elem) => {
        gsapAnimate.onStartEnd(elem)
    })
}

gsap.registerPlugin(MotionPathPlugin)


const t1 = gsap.timeline({ defaults: {duration: 2}, repeat: -1, yoyo: true})
t1.fromTo('#path', { stroke: '#0A6FB1', strokeDasharray: '328%', strokeDashoffset: '328%' }, { stroke: '#0A6FB1', strokeDashoffset: '0', strokeLinecap: 'round' })
// t1.to('#text', {duration: 2, motionPath: {
//     path: '#path',
//     autoRotate: true,
//     align: '#path'
// }})
// t1.to('#path', { stroke: 'red', strokeDasharray: 'none', strokeDashoffset: '0' })
const t2 = gsap.timeline({ defaults: {duration: 2, stroke: '#0A6FB1'}, repeat: -1, yoyo: true})
t2.to('#circle', { strokeDasharray: '10%', strokeWidth: '80%' })
t2.to('#circle', { strokeDashoffset: '80%', strokeWidth: '2%', opacity: 1,  })

const t3 = gsap.timeline({ defaults: {duration: 2, }, repeat: -1, yoyo: true})
t3.fromTo('#elip-path', { stroke: '#ffffff', strokeDasharray: '328%', strokeDashoffset: '328%' }, { stroke: '#0A6FB1', strokeDashoffset: '0', strokeLinecap: 'round' })
gsap.fromTo('#circle1', { stroke: '#ffffff', strokeDasharray: '328%', strokeDashoffset: '328%' }, { stroke: '#0A6FB1', strokeDashoffset: '0' ,strokeLinecap: 'round', repeat: -1, yoyo: true},)
gsap.set('#elip', {xPercent: -50, yPercent: -50, transformOrigin: '50% 50%'})
gsap.to('#elip', {duration: 2,repeat: -1,yoyo: true, motionPath: {
    path: '#elip-path',
    autoRotate: true,
    align: '#elip-path',
}
})

gsap.set('#text-1', {xPercent: -50, yPercent: -50, transformOrigin: '50% 50%'})
gsap.to('#text-1', {duration: 2,repeat: -1,yoyo: true,  motionPath: {
    path: '#elip-path',
    autoRotate: true,
    align: '#elip-path'
}})
//curve

gsap.set('#text-2', {xPercent: -50, yPercent: -50, transformOrigin: '50% 50%'})
gsap.to('#text-2', {duration: 4,repeat: -1,  motionPath: {
    path: '#curve',
    autoRotate: true,
    align: '#curve'
}})

//race-trake
gsap.set('#text', {xPercent: -50, yPercent: -50, transformOrigin: '50% 50%'})
gsap.to('#text', {duration: 4,repeat: -1, ease: 'none',  motionPath: {
    path: '#race-trake',
    autoRotate: true,
    align: '#race-trake'
}
})
gsap.set('#circle2', {transformOrigin: '50% 50%'})
gsap.to('#circle2', {rotate: 360, duration: 5, ease: 'none', repeat: -1})