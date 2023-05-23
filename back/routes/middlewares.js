exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({
        errorCode: 2,
        errorMessage: '로그인이 필요합니다.',
    });
}

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({
        errorCode: 2,
        errorMessage: '로그인 상태에서 처리할 수 없는 작업입니다.',
    });
}

