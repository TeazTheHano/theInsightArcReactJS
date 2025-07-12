import { TextBodyLarge } from '../components/TextBox/textBox'
import LazyImage from '../components/LazyImage/lazyImage'

function LandingPage() {
    return (

        <div className={``}>
            <LazyImage src='/photos/home/theinsightArcbanner.jpg' alt='logo' aspectRatio='16/9' />
            <br />
            {/* content */}
            <div style={{
                padding: `0 var(--Padding-and-Margin-PM-0, 24px)`
            }}>
                <TextBodyLarge children='Coming soon...' color='var(--Schemes-On-Primary-Container)' />
            </div>
        </div>


    )
}

export default LandingPage
