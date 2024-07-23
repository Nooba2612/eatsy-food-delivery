
import classNames from 'classnames/bind';

import styles from "@styles/GlobalStyles.module.css";

const cx = classNames.bind(styles);
function GlobalStyles({children}) {
    return children;
}

export default GlobalStyles;
