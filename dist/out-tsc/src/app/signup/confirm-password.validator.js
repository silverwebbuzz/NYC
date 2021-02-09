var ConfirmPasswordValidator = /** @class */ (function () {
    function ConfirmPasswordValidator() {
    }
    ConfirmPasswordValidator.MatchPassword = function (control) {
        var password = control.get('password').value;
        var confirmPassword = control.get('confirmPassword').value;
        if (!confirmPassword) {
            return true;
        }
        if (password != confirmPassword) {
            control.get('confirmPassword').setErrors({ ConfirmPassword: true });
        }
        else {
            return null;
        }
    };
    return ConfirmPasswordValidator;
}());
export { ConfirmPasswordValidator };
//# sourceMappingURL=confirm-password.validator.js.map