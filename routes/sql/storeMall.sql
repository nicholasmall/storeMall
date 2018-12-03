/*
Navicat MySQL Data Transfer

Source Server         : 阿里云
Source Server Version : 50722
Source Host           : 39.104.123.77:3306
Source Database       : storeMall

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2018-12-03 11:54:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for BL_HD_ADDRESS_BOOK
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_ADDRESS_BOOK`;
CREATE TABLE `BL_HD_ADDRESS_BOOK` (
  `USER_NAME` varchar(100) NOT NULL COMMENT '姓名',
  `PHONE_NUMBER` varchar(100) NOT NULL COMMENT '电话',
  `POSTAL_CODE` varchar(100) DEFAULT NULL COMMENT '邮政编码',
  `PROVINCE` varchar(20) DEFAULT NULL COMMENT '省份',
  `CITY` varchar(100) DEFAULT NULL COMMENT '市区',
  `AREA` varchar(100) DEFAULT NULL COMMENT '区域',
  `DETAILED_ADDRESS` varchar(200) NOT NULL COMMENT '详细收货地址',
  `ID` varchar(100) NOT NULL COMMENT '主键',
  `USER_ID` varchar(100) NOT NULL COMMENT '用户表外键',
  `IS_DEFAULT` char(1) NOT NULL DEFAULT '1' COMMENT '是否默认 0/默认  1/否',
  `LANGUAGE` varchar(100) NOT NULL DEFAULT 'zh_CN' COMMENT '语言',
  `COUNTRIES` varchar(100) NOT NULL DEFAULT 'China' COMMENT '国家',
  `PROVINCE_CODE` varchar(100) DEFAULT NULL COMMENT '省份code',
  `CITY_CODE` varchar(100) DEFAULT NULL COMMENT '市区code',
  `AREA_CODE` varchar(100) DEFAULT NULL COMMENT '区域code',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='地址簿';

-- ----------------------------
-- Table structure for BL_HD_ALIPAY
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_ALIPAY`;
CREATE TABLE `BL_HD_ALIPAY` (
  `PAY_ID` varchar(100) DEFAULT NULL COMMENT '支付记录id',
  `PAY_AMOUNT` decimal(8,0) DEFAULT NULL COMMENT '支付金额',
  `TRANSFER_NOTE` varchar(100) DEFAULT NULL COMMENT '转账备注码',
  `PAY_STATE` char(1) DEFAULT NULL COMMENT '支付状态（1/未支付，2/支付成功，3/支付失败)',
  `FAILCAUSE` varchar(100) DEFAULT NULL COMMENT '失败原因',
  `ID` varchar(100) NOT NULL COMMENT '主键',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='支付宝记录表';

-- ----------------------------
-- Table structure for BL_HD_AREA
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_AREA`;
CREATE TABLE `BL_HD_AREA` (
  `AREAID` varchar(50) DEFAULT NULL,
  `AREA` varchar(60) DEFAULT NULL,
  `FATHER` varchar(6) DEFAULT NULL,
  `ID` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='区';

-- ----------------------------
-- Table structure for BL_HD_BANKS_PAY
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_BANKS_PAY`;
CREATE TABLE `BL_HD_BANKS_PAY` (
  `PAY_ID` varchar(100) DEFAULT NULL COMMENT '支付记录ID',
  `PAY_AMOUNT` decimal(8,0) DEFAULT NULL COMMENT '支付金额',
  `TRANSFER_NOTE` varchar(100) DEFAULT NULL COMMENT '转账备注码',
  `PAY_STATE` char(1) DEFAULT NULL COMMENT '支付状态（1/未支付，2/支付成功，3/支付失败)',
  `FAILCAUSE` varchar(100) DEFAULT NULL COMMENT '失败原因',
  `ID` varchar(100) NOT NULL COMMENT '主键',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='银行支付';

-- ----------------------------
-- Table structure for BL_HD_CITY
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_CITY`;
CREATE TABLE `BL_HD_CITY` (
  `CITYID` varchar(6) DEFAULT NULL,
  `CITY` varchar(50) DEFAULT NULL,
  `FATHER` varchar(6) DEFAULT NULL,
  `ID` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='市';

-- ----------------------------
-- Table structure for BL_HD_CONFIG
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_CONFIG`;
CREATE TABLE `BL_HD_CONFIG` (
  `USD_CNY` decimal(8,0) DEFAULT NULL COMMENT '1美元=6.9291人民币',
  `ORDER_TIMEOUT` decimal(8,0) DEFAULT NULL COMMENT '单位小时',
  `ID` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='配置表';

-- ----------------------------
-- Table structure for BL_HD_COUNTRIES
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_COUNTRIES`;
CREATE TABLE `BL_HD_COUNTRIES` (
  `ID` varchar(100) NOT NULL COMMENT 'id',
  `NATIONALITY` varchar(50) DEFAULT NULL COMMENT '国籍',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for BL_HD_LOGISTICS
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_LOGISTICS`;
CREATE TABLE `BL_HD_LOGISTICS` (
  `LOGISTICS_ID` varchar(100) DEFAULT NULL COMMENT '物流id',
  `USER_NAME` varchar(100) DEFAULT NULL COMMENT '姓名',
  `PHONE_NUMBER` varchar(100) DEFAULT NULL COMMENT '电话',
  `POSTAL_CODE` varchar(100) DEFAULT NULL COMMENT '邮政编码',
  `PROVINCE` varchar(20) DEFAULT NULL COMMENT '省',
  `CITY` varchar(100) DEFAULT NULL COMMENT '市',
  `AREA` varchar(100) DEFAULT NULL COMMENT '区域',
  `DETAILED_ADDRESS` varchar(500) DEFAULT NULL COMMENT '详细收货地址',
  `COURIER_ORDER` varchar(100) DEFAULT NULL COMMENT '快递订单号',
  `COURIER_TYPE` varchar(100) DEFAULT NULL COMMENT '快递类型',
  `COURIER_STATE` char(1) DEFAULT NULL COMMENT '快递状态（1/待发货，2/已发货，3/运行中，4/已签收,其它）',
  `NOTE` varchar(100) DEFAULT NULL COMMENT '备注',
  `ID` varchar(100) NOT NULL COMMENT '主键',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='物流表';

-- ----------------------------
-- Table structure for BL_HD_ORDER_DETAILS
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_ORDER_DETAILS`;
CREATE TABLE `BL_HD_ORDER_DETAILS` (
  `ORDER_ID` varchar(100) DEFAULT NULL COMMENT '订单id',
  `PRODUCT_ID` varchar(100) DEFAULT NULL COMMENT '产品id',
  `PRODUCT_QUANTITY` decimal(38,8) DEFAULT NULL COMMENT '产品数量',
  `PRICE` decimal(38,8) DEFAULT NULL COMMENT '价格（CNY）',
  `AMOUNT_DUE` decimal(38,8) DEFAULT NULL COMMENT '应付款金额（CNY）',
  `ACTUAL_PAYMENT` decimal(38,8) DEFAULT NULL COMMENT '实际付款金额（CNY）',
  `ID` varchar(100) NOT NULL COMMENT '主键',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='订单详情表';

-- ----------------------------
-- Table structure for BL_HD_ORDER_FORM
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_ORDER_FORM`;
CREATE TABLE `BL_HD_ORDER_FORM` (
  `USER_ID` varchar(100) DEFAULT NULL COMMENT '用户id',
  `ORDER_ID` varchar(100) DEFAULT NULL COMMENT '订单id',
  `ORDER_STATE` char(1) DEFAULT NULL COMMENT '订单状态（0 待支付，1 已支付，2 发货中（等待收货），3 已完成 4 已取消 5 订单已超时）',
  `ORDER_TIME` int(15) DEFAULT NULL COMMENT '下单时间',
  `FAILURE_TIME` int(15) DEFAULT NULL COMMENT '失效时间',
  `LOGISTICS_ID` varchar(100) DEFAULT NULL COMMENT '物流id',
  `INVOICE_ID` varchar(100) DEFAULT NULL COMMENT '发票id',
  `INVOICE_TYPE` varchar(100) DEFAULT NULL COMMENT '发票类型',
  `ID` varchar(100) NOT NULL COMMENT '主键',
  `PAYABLE` decimal(8,0) DEFAULT NULL COMMENT '应付款',
  `REAL_PAY` decimal(8,0) DEFAULT NULL COMMENT '实付款',
  `USER_NAME` varchar(100) DEFAULT NULL COMMENT '姓名',
  `PHONE_NUMBER` varchar(20) DEFAULT NULL COMMENT '电话',
  `POSTAL_CODE` varchar(100) DEFAULT NULL COMMENT '邮政编码',
  `PROVINCE` varchar(100) DEFAULT NULL COMMENT '省份',
  `CITY` varchar(100) DEFAULT NULL COMMENT '市区',
  `AREA` varchar(100) DEFAULT NULL COMMENT '区域',
  `DETAILED_ADDRESS` varchar(500) DEFAULT NULL COMMENT '详细收货地址',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='订单表';

-- ----------------------------
-- Table structure for BL_HD_ORDER_PAY
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_ORDER_PAY`;
CREATE TABLE `BL_HD_ORDER_PAY` (
  `ORDER_ID` varchar(100) DEFAULT NULL COMMENT '订单ID',
  `PAY_ID` varchar(100) DEFAULT NULL COMMENT '支付记录ID',
  `PAY_TIME` int(15) DEFAULT NULL COMMENT '支付时间',
  `PAY_WAY` char(1) DEFAULT NULL COMMENT '支付方式(1支付宝  2微信  3银链)',
  `PAY_STATE` char(1) DEFAULT NULL COMMENT '支付状态',
  `ID` varchar(100) NOT NULL COMMENT '主键',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='订单支付表';

-- ----------------------------
-- Table structure for BL_HD_PHYSICAL_PRODUCT
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_PHYSICAL_PRODUCT`;
CREATE TABLE `BL_HD_PHYSICAL_PRODUCT` (
  `PRODUCT_ID` varchar(100) DEFAULT NULL COMMENT '产品id',
  `PICTURE_URL` varchar(100) DEFAULT NULL COMMENT '图片URL',
  `FLAG` varchar(100) DEFAULT NULL COMMENT '标记 1/产品展示图，2/产品详情，3/分类图',
  `ID` varchar(100) NOT NULL COMMENT '主键',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='产品实物图';

-- ----------------------------
-- Table structure for BL_HD_PREFERENTIAL_GOODS
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_PREFERENTIAL_GOODS`;
CREATE TABLE `BL_HD_PREFERENTIAL_GOODS` (
  `ID` varchar(100) NOT NULL COMMENT '主键',
  `GOODS_ID` varchar(100) DEFAULT NULL COMMENT '产品id',
  `PREFERENTIAL_TYPE` varchar(100) DEFAULT NULL COMMENT '类型：1/2/3/4',
  `START_TIME` int(15) DEFAULT NULL COMMENT '开始时间',
  `END_TIME` int(15) DEFAULT NULL COMMENT '结束时间',
  `DISCOUNT` decimal(8,0) DEFAULT NULL COMMENT '折扣率',
  `PREFERENTIAL_FROM` decimal(8,0) DEFAULT NULL COMMENT '优惠起始值',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='商品优惠表';

-- ----------------------------
-- Table structure for BL_HD_PRODUCT
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_PRODUCT`;
CREATE TABLE `BL_HD_PRODUCT` (
  `ID` varchar(100) NOT NULL COMMENT '主键',
  `PRODUCT_ID` varchar(100) DEFAULT NULL COMMENT '产品id',
  `PRODUCT_NAME_ZH_CN` varchar(100) DEFAULT NULL COMMENT '产品名称(中文）',
  `PRODUCT_NAME_EN` varchar(100) DEFAULT NULL COMMENT '产品名称（英文）',
  `CATEGORIES_BLG_ID` varchar(100) DEFAULT NULL COMMENT '产品大类ID',
  `CATEGORIES_SMALL_ID` varchar(100) DEFAULT NULL COMMENT '产品小类ID',
  `PRODUC_TOTAL` decimal(8,0) DEFAULT NULL COMMENT '产品总量',
  `HAVE_SALES` decimal(8,0) DEFAULT NULL COMMENT '已销售数量',
  `SALES_STATE` char(1) DEFAULT NULL COMMENT '产品销售状态（1/上架，2/下架,3/售罄）',
  `PRODUCT_STATE` char(1) DEFAULT NULL COMMENT '产品编辑状态（1/新建，2/删除,3/完成)',
  `PRODUCT_DESCRIBE_ZH_CN` varchar(500) DEFAULT NULL COMMENT '产品描述(中文）',
  `PRODUCT_DESCRIBE_EN` varchar(500) DEFAULT NULL COMMENT '产品描述（英文）',
  `PRODUCT_FEATURES_ZH_CN` varchar(500) DEFAULT NULL COMMENT '产品特性(中文)',
  `PRODUCT_FEATURES_EN` varchar(500) DEFAULT NULL COMMENT '产品特性(英文)',
  `PRODUCT_TAG_PRICE` decimal(8,0) DEFAULT NULL COMMENT '产品标价(CNY)',
  `PRODUCT_PRICE` decimal(8,0) DEFAULT NULL COMMENT '产品售价(CNY)',
  `PRODUCT_DEFAULT` char(1) DEFAULT NULL COMMENT '产品默认显示 0/不显示， 1/显示（商品列表用）',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='产品表';

-- ----------------------------
-- Table structure for BL_HD_PRODUCT_CATEGORIES
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_PRODUCT_CATEGORIES`;
CREATE TABLE `BL_HD_PRODUCT_CATEGORIES` (
  `ID` varchar(100) NOT NULL COMMENT '主键',
  `CATEGORIES_BLG_ID` varchar(100) DEFAULT NULL COMMENT '产品大类ID',
  `CATEGORIES_ZH_CN` varchar(100) DEFAULT NULL COMMENT '产品大类名称（中文）',
  `CATEGORIES_EN` varchar(100) DEFAULT NULL COMMENT '产品大类名称（英文）',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='产品大类表';

-- ----------------------------
-- Table structure for BL_HD_PRODUCT_SMALL
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_PRODUCT_SMALL`;
CREATE TABLE `BL_HD_PRODUCT_SMALL` (
  `ID` varchar(100) NOT NULL COMMENT '主键',
  `CATEGORIES_BLG_ID` varchar(100) DEFAULT NULL COMMENT '产品大类id',
  `CATEGORIES_ZH_CN` varchar(100) DEFAULT NULL COMMENT '产品小类名称（中文）',
  `CATEGORIES_EN` varchar(100) DEFAULT NULL COMMENT '产品小类名称（英文）',
  `CATEGORIES_SMALL_ID` varchar(100) DEFAULT NULL COMMENT '产品小类id',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='产品小类表';

-- ----------------------------
-- Table structure for BL_HD_PROVINCE
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_PROVINCE`;
CREATE TABLE `BL_HD_PROVINCE` (
  `PROVINCEID` varchar(6) DEFAULT NULL,
  `PROVINCE` varchar(40) DEFAULT NULL,
  `ID` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='省';

-- ----------------------------
-- Table structure for BL_HD_SHOPPING_CART
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_SHOPPING_CART`;
CREATE TABLE `BL_HD_SHOPPING_CART` (
  `USER_ID` varchar(100) DEFAULT NULL COMMENT '用户id',
  `PRODUCT_ID` varchar(100) DEFAULT NULL COMMENT '产品id',
  `PRODUCT_QUANTITY` decimal(8,0) DEFAULT NULL COMMENT '产品数量',
  `CREATE_TIME` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间',
  `ID` varchar(100) NOT NULL COMMENT '主键',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='购物车表';

-- ----------------------------
-- Table structure for BL_HD_USER
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_USER`;
CREATE TABLE `BL_HD_USER` (
  `ACCOUNT_NAME` varchar(100) DEFAULT NULL COMMENT '账户名称',
  `PHONE_NUMBER` varchar(100) DEFAULT NULL COMMENT '手机号码',
  `EMAIL` varchar(100) DEFAULT NULL COMMENT '邮箱号码',
  `LANDING_PASSWORD` varchar(100) DEFAULT NULL COMMENT '登陆密码',
  `TRADING_PASSWORD` varchar(100) DEFAULT NULL COMMENT '交易密码',
  `USER_STATE` char(1) DEFAULT NULL COMMENT '用户状态',
  `NAME_AUTHENTICATION` char(1) DEFAULT NULL COMMENT '实名认证状态',
  `ID` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `SALT` varchar(100) DEFAULT NULL COMMENT '盐值',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COMMENT='用户表';

-- ----------------------------
-- Table structure for BL_HD_WECHAT_PAY
-- ----------------------------
DROP TABLE IF EXISTS `BL_HD_WECHAT_PAY`;
CREATE TABLE `BL_HD_WECHAT_PAY` (
  `PAY_ID` varchar(100) DEFAULT NULL COMMENT '支付记录ID',
  `PAY_AMOUNT` decimal(8,0) DEFAULT NULL COMMENT '支付金额',
  `TRANSFER_NOTE` varchar(100) DEFAULT NULL COMMENT '转账备注码',
  `PAY_STATE` char(1) DEFAULT NULL COMMENT '支付状态（1/未支付，2/支付成功，3/支付失败）',
  `FAILCAUSE` varchar(100) DEFAULT NULL COMMENT '失败原因',
  `ID` varchar(100) NOT NULL COMMENT '主键',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='微信支付记录表';
