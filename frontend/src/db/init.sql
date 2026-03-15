CREATE DATABASE IF NOT EXISTS sip_calculator;
USE sip_calculator;

CREATE TABLE IF NOT EXISTS calculations (
    id                     INT AUTO_INCREMENT PRIMARY KEY,

    -- Inputs
    present_cost           DECIMAL(15, 2)  NOT NULL,
    years                  INT             NOT NULL,
    inflation_rate         DECIMAL(5, 2)   NOT NULL,
    annual_return          DECIMAL(5, 2)   NOT NULL,
    step_up_rate           DECIMAL(5, 2)   NOT NULL DEFAULT 0,
    goal_type              ENUM('Custom','Education','Medical','Lifestyle','Retirement') NOT NULL DEFAULT 'Custom',
    retirement_years       INT             NOT NULL DEFAULT 0,
    post_retirement_return DECIMAL(5, 2)   NOT NULL DEFAULT 0,
    is_tax_enabled         TINYINT(1)      NOT NULL DEFAULT 0,

    -- Computed Results
    future_value           DECIMAL(15, 2)  NOT NULL,
    monthly_sip            DECIMAL(15, 2)  NOT NULL,
    total_investment       DECIMAL(15, 2)  NOT NULL,
    total_earnings         DECIMAL(15, 2)  NOT NULL,
    adjusted_inflation     DECIMAL(5, 2)   NOT NULL,

    -- Metadata
    created_at             TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_created_at (created_at),
    INDEX idx_goal_type (goal_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
