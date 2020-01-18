import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    Col,
    Progress,
    Row,
    Table,
} from 'reactstrap';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { connect } from 'react-redux'
import Widget04 from '../Default/Widgets/Widget04';
import Widget01 from '../Default/Widgets/Widget01';
import Widget02 from '../Default/Widgets/Widget02'

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')
// sparkline charts
const sparkLineChartData = [
    {
        data: [1450, 4300, 3000],
        label: 'Ventas en S/.',
    },
    {
        data: [100, 1020, 900],
        label: 'Deudas en S/.',
    },
    {
        data: [35, 23, 56, 22, 97, 23, 64],
        label: 'Pageviews',
    },
 
];

const makeSparkLineData = (dataSetNo, variant) => {
    const dataset = sparkLineChartData[dataSetNo];
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo'],
        datasets: [
            {
                backgroundColor: 'transparent',
                borderColor: variant ? variant : '#c2cfd6',
                data: dataset.data,
                label: dataset.label,
            },
        ],
    };
    return () => data;
};

const sparklineChartOpts = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        xAxes: [
            {
                display: false,
            }],
        yAxes: [
            {
                display: false,
            }],
    },
    elements: {
        line: {
            borderWidth: 2,
        },
        point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
        },
    },
    legend: {
        display: false,
    },
};

class Dashboard extends Component {

    categoriesSales = [{ 'name': "Golosinas", "percentage": "10", "sales": "4800" },{ 'name': "Hogar", "percentage": "38", "sales": "9800" }]
    sexSales = [{ 'name': "Hombre", "percentage": "10" },{ 'name': "Mujer", "percentage": "40" }]
    monthsSales = [{ 'name': "Enero", "salePer": "10", "debtPer": "20" }, { 'name': "Febrero", "salePer": "10", "debtPer": "20" },{ 'name': "Marzo", "salePer": "10", "debtPer": "20" }]
    renderCustomerRow = (customers) => {
        return (
            customers.map(customer => {
                return (
                    <tr>
                        <td className="text-center">
                            <div className="avatar">
                                <img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                <span className="avatar-status badge-danger"></span>
                            </div>
                        </td>
                        <td>
                            <div>{customer.name}</div>
                            <div className="small text-muted">
                                <span>Nuevo</span> | Registrado: {customer.created_at}
                            </div>
                        </td>
                        <td className="text-center">
                            {/* <i className="flag-icon flag-icon-pe h4 mb-0" title="pl" id="pl"></i> */}
                            <span className="" style={{ fontSize: 16 + 'px' }}>S/{customer.totalDebts}</span>
                        </td>
                        <td>
                            <div className="clearfix">
                                <div className="float-left">
                                    <strong>{Math.round(customer.totalSales/this.props.orderState.totalSales * 100)}%</strong>
                                </div>
                                {/* <div className="float-right">
                                    <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                                </div> */}
                            </div>
                            <Progress className="progress-xs" color="success" value={Math.round(customer.totalSales/this.props.orderState.totalSales * 100)} />
                        </td>
                        <td className="text-center">
                            <span className="" style={{ fontSize: 16 + 'px' }}>S/{customer.totalSales}</span>
                        </td>
                        <td>
                            <div className="small text-muted">Ultima compra</div>
                            <strong>Ayer</strong>
                        </td>
                    </tr>
                )
            })
        )
    }

    renderCategoriesSales = (categoriesSales) => {
        return (
         
            categoriesSales.map(categorySale => {
                return (                    
                        <div className="progress-group">
                            <div className="progress-group-header">
                                <i className="icon-bag progress-group-icon"></i>
                                <span className="title">{categorySale.name}</span>
                                <span className="ml-auto font-weight-bold">S/{categorySale.sales}<span className="text-muted small">   ({categorySale.percentage} %)</span></span>
                            </div>
                            <div className="progress-group-bars">
                                <Progress className="progress-xs" color="success" value={categorySale.percentage} />
                            </div>
                        </div>                    
                )
            })            
        )
    }

    renderSexSales = (sexSales) => {
        return (
            sexSales.map((sexSale) => {                
                if(sexSale.name==="Hombre"){
                    return (                    
                        <div className="progress-group" >
                            <div className="progress-group-header">
                                <i className="icon-user-female progress-group-icon"></i>
                                <span className="title">{sexSale.name}</span>
                                <span className="ml-auto font-weight-bold">{sexSale.percentage} %</span>
                            </div>
                            <div className="progress-group-bars">
                                <Progress className="progress-xs" color="warning" value={sexSale.percentage} />
                            </div>
                        </div>                    
                )
                }else{
                    return (                    
                        <div className="progress-group mb-5">
                            <div className="progress-group-header">
                                <i className="icon-user-female progress-group-icon"></i>
                                <span className="title">{sexSale.name}</span>
                                <span className="ml-auto font-weight-bold">{sexSale.percentage} %</span>
                            </div>
                            <div className="progress-group-bars">
                                <Progress className="progress-xs" color="warning" value={sexSale.percentage} />
                            </div>
                        </div>                    
                )
                }
            })
        )
    }

    renderMonthsSales = (monthsSales) => {
        return (
            monthsSales.map(monthSale => {
                return (
                    <React.Fragment>
                        <div className="progress-group mb-4">
                            <div className="progress-group-prepend">
                                <span className="progress-group-text">{monthSale.name}</span>
                            </div>
                            <div className="progress-group-bars">
                                <Progress className="progress-xs" color="info" value={monthSale.salePer} />
                                <Progress className="progress-xs" color="danger" value={monthSale.debtPer} />
                            </div>
                        </div>
                    </React.Fragment>
                )
            })
        )
    }



    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col xs="12" sm="6" lg="3">
                        <Widget01 color="primary" variant="" header={`S/${this.props.orderState.totalSales}`} mainText="Ingresos totales" smallText="">
                            <small className="text-muted">Ingreso por venta de productos</small>
                        </Widget01>
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <Widget01 color="primary" variant="" header={`S/${this.props.orderState.totalDebts}`} mainText="Deudas totales" smallText="">
                            <small className="text-muted">Deudas por productos fiados</small>
                        </Widget01>
                    </Col>
                    <Col sm="6" md="2">
                        <Widget04 icon="icon-user-follow" color="success" header={this.props.customers.length} value="100" invert>Nuevos Clientes</Widget04>
                    </Col>
                    <Col sm="6" md="2">
                        <Widget04 icon="icon-basket-loaded" color="danger" header={this.props.products.length} value="100" invert>Cantidad de Productos</Widget04>
                    </Col>
                    <Col sm="6" md="2">
                        <Widget04 icon="icon-basket-loaded" color="info" header={this.props.categories.length} value="100" invert>Cantidad de Categorías</Widget04>
                    </Col>
                </Row>
                {/* <Row>
                    <Col xs="12" sm="6" lg="3">
                        <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-cogs" color="primary" />
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-laptop" color="info" />
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-moon-o" color="warning" />
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-bell" color="danger" />
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-cogs" color="primary" footer link="#" />
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-laptop" color="info" footer />
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-moon-o" color="warning" footer />
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-bell" color="danger" footer />
                    </Col>
                </Row> */}
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                Estadística de Ventas por Categoría, Mes y por Género
                             </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" md="6" xl="6">
                                        <Row>
                                            <Col sm="6">
                                                <div className="callout callout-info">
                                                    <small className="text-muted">Ventas</small>
                                                    <br />
                                                    <strong className="h4">S/{this.props.orderState.totalSales}</strong>
                                                    <div className="chart-wrapper">
                                                        <Line data={makeSparkLineData(0, brandPrimary)} options={sparklineChartOpts} width={100} height={30} />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col sm="6">
                                                <div className="callout callout-danger">
                                                    <small className="text-muted">Deudas </small>
                                                    <br />
                                                    <strong className="h4">S/{this.props.orderState.totalDebts}</strong>
                                                    <div className="chart-wrapper">
                                                        <Line data={makeSparkLineData(1, brandDanger)} options={sparklineChartOpts} width={100} height={30} />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <hr className="mt-0" />
                                        {this.renderMonthsSales(this.monthsSales)}
                                        <div className="legend text-center">
                                            <small>
                                                <sup className="px-1"><Badge pill color="info">&nbsp;</Badge></sup>
                                                Ventas
                                                &nbsp;
                                                <sup className="px-1"><Badge pill color="danger">&nbsp;</Badge></sup>
                                                Deudas
                                            </small>
                                        </div>
                                    </Col>
                                    <Col xs="12" md="6" xl="6">
                                        {/* <Row>
                                            <Col sm="6">
                                                <div className="callout callout-warning">
                                                    <small className="text-muted">Pageviews</small>
                                                    <br />
                                                    <strong className="h4">78,623</strong>
                                                    <div className="chart-wrapper">
                                                        <Line data={makeSparkLineData(2, brandWarning)} options={sparklineChartOpts} width={100} height={30} />
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col sm="6">
                                                <div className="callout callout-success">
                                                    <small className="text-muted">Organic</small>
                                                    <br />
                                                    <strong className="h4">49,123</strong>
                                                    <div className="chart-wrapper">
                                                        <Line data={makeSparkLineData(3, brandSuccess)} options={sparklineChartOpts} width={100} height={30} />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row> */}
                                        {/* <hr className="mt-0" /> */}
                                        <ul>
                                            {this.renderSexSales(this.sexSales)}
                                            {this.renderCategoriesSales(this.categoriesSales)}
                                        </ul>

                                    </Col>
                                </Row>
                                <br />
                                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="text-center"><i className="icon-people"></i></th>
                                            <th>Cliente</th>
                                            <th className="text-center">Deuda</th>
                                            <th>Porcentaje de compra</th>
                                            <th className="text-center">Total de compras</th>
                                            <th>Actividad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderCustomerRow(this.props.customers)}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        categories: state.categoriesReducer.categories,
        products: state.productsReducer.products,
        customers: state.customersReducer.customers,
        orderState: state.ordersReducer
    }
}

export default connect(mapStateToProps, null)(Dashboard); 