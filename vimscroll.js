(function() {
  'use strict'

  const getPosts = () => Array.from(document.querySelectorAll('.Post'))
  const getDistanceFromTop = el => el.offsetTop
  const getPostsDistances = () => getPosts().map(getDistanceFromTop).sort((a, b) => a - b)
  const pageDown = () => window.scrollTo(0, window.scrollY + window.innerHeight)
  const pageUp = () => window.scrollTo(0, window.scrollY - window.innerHeight)
  // Filter any post that is beneath 20% of the top of the screen.
  const below = distance => distance > (window.scrollY + window.innerHeight/5)
  // Filter any post above the top of the screen
  const above = distance => distance < window.scrollY

  const scrollDown = () => {
    const postsBelow = getPostsDistances().filter(below)
    const [ nextPost ] = postsBelow
    const hasPostsBelow = !!nextPost
    const isPostLargerThanScreen = nextPost > window.scrollY + window.innerHeight
    // Scroll to next post if it's visible...
    if (hasPostsBelow && !isPostLargerThanScreen) return window.scrollTo(0, postsBelow.shift())
    // PageDown if it's not.
    pageDown()
  }

  const scrollUp = () => {
    const postsAbove = getPostsDistances().filter(above)
    const [ previousPost ] = postsAbove
    const hasPostsAbove = !!previousPost

    if (hasPostsAbove) return window.scrollTo(0, postsAbove.pop())
    pageUp()
  }

  document.addEventListener('keydown', (e) => {
    const { code } = e
    if (code === 'KeyJ') scrollDown()
    if (code === 'KeyK') scrollUp()
  })
})()
