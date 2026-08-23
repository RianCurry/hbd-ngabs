# TODO

Development roadmap for the birthday surprise website.

---

## 1. Content

- [ ] Replace placeholder name "FICHA" and age "21" in `src/content/birthday.ts` if needed
- [ ] Add memory descriptions to `src/content/memories.ts`
- [ ] Add journey descriptions to `src/content/journey.ts`
- [ ] Add wish content to `src/content/wishes.ts`
- [ ] Add personal message to `src/content/message.ts`
- [ ] Add prize content to `src/content/prizes.ts`

## 2. Visual Design

- [ ] Design custom color palette
- [ ] Style the Tic-Tac-Toe board with themed visuals
- [ ] Create cake visual (CSS or image)
- [ ] Design candle visuals
- [ ] Style gift boxes with ribbons/bows
- [ ] Create journey timeline visual design
- [ ] Design closing scene background
- [ ] Add page/scene background designs
- [ ] Style the progress indicator

## 3. Assets

- [ ] Add birthday background image to `public/images/`
- [ ] Add cake image to `public/images/`
- [ ] Add journey photos to `public/images/`
- [ ] Add prize images to `public/prizes/`
- [ ] Add background music to `public/audio/bgm.mp3`
- [ ] Add memory images to `public/images/`

## 4. Animation

- [ ] Add confetti effect to BirthdayReveal scene
- [ ] Add cake entrance animation
- [ ] Add candle blow-out particle effect
- [ ] Add prize box open animation
- [ ] Add journey timeline scroll animation
- [ ] Add letter unfold animation for MessageScene
- [ ] Add page transition effects between scenes
- [ ] Add floating elements/animations to closing scene

## 5. Interaction Polish

- [ ] Add haptic feedback on mobile for candle blow
- [ ] Add sound effects for game moves
- [ ] Add sound effect for birthday reveal
- [ ] Add sound effect for prize open
- [ ] Add swipe navigation between scenes
- [ ] Add auto-advance timer option for reveal scenes

## 6. Mobile

- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Verify touch targets are ≥44px
- [ ] Check landscape mode behavior
- [ ] Test viewport height on mobile browsers
- [ ] Verify no horizontal overflow on any screen

## 7. Accessibility

- [ ] Add ARIA labels to all interactive elements
- [ ] Test keyboard navigation through all scenes
- [ ] Add skip-to-content link
- [ ] Test with screen reader
- [ ] Verify color contrast ratios
- [ ] Add focus-visible styles

## 8. Testing

- [ ] Manual test: complete flow Tic-Tac-Toe → Closing
- [ ] Test game retry flow
- [ ] Test candle interaction on touch device
- [ ] Test prize open on touch device
- [ ] Test audio toggle
- [ ] Test browser back/forward behavior
- [ ] Test page refresh behavior

## 9. Deployment

- [ ] Choose deployment platform (Vercel recommended)
- [ ] Configure domain
- [ ] Set up environment variables if needed
- [ ] Test production build
- [ ] Add Open Graph meta tags
- [ ] Add favicon
- [ ] Test on slow network
