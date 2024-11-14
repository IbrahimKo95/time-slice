

export default function Work(props: { size?: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 430 430" fill="none">
            <path d="M290 105V75C290 63.9543 281.046 55 270 55H160C148.954 55 140 63.9543 140 75V105" stroke="#3A3347"
                  stroke-width="7" stroke-miterlimit="15.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path
                d="M390 335C390 351.568 376.569 365 360 365H70C53.4315 365 40 351.569 40 335V135C40 118.431 53.4315 105 70 105H360C376.569 105 390 118.431 390 135V335Z"
                fill="#B26836"/>
            <g opacity="0.4">
                <path
                    d="M105 365C88.4315 365 75 351.569 75 335V135C75 118.431 88.4315 105 105 105H70C53.4315 105 40 118.431 40 135V335C40 351.569 53.4315 365 70 365H105Z"
                    fill="#B26836"/>
            </g>
            <g opacity="0.4">
                <path d="M360 365C376.569 365 390 351.568 390 335V235H40V335C40 351.569 53.4315 365 70 365H360Z"
                      fill="#B26836"/>
            </g>
            <path d="M170 235V272C170 273.657 171.343 275 173 275H257C258.657 275 260 273.657 260 272V235"
                  fill="#FFC738"/>
            <g opacity="0.5">
                <path d="M170 272V235H215V275H173C171.343 275 170 273.657 170 272Z" fill="#FFC738"/>
            </g>
        </svg>
    )
}