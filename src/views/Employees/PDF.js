import React from 'react';
import { PDFViewer, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'

export default class PDF extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      ready: true,
      foo: 'Unchanged Value',
    };
  }  

  componentDidMount() {    

    // ************************************************************************************
    // BEGIN HACKY BS - wait 1ms for props and state to settle before rendering the PDF
    // react-pdf crashes if a re-render occurs when it's already rendering.

    this.setState({ ready: false });
    setTimeout(()=>{
      this.setState({ ready: true });
    }, 1);

    // END *******************************************************************************
  }

  reformatType = (type)=>{
    switch(type){case "1":return "FUNCIONAL";break; case "2": return "NO FUNCIONAL";break;default: return "NO DEFINIDO";break}
  }



  render() {
    if (this.state.ready && this.props.isReady) {
      return (
        <React.Fragment>
          <PDFViewer width="100%" height={window.innerHeight*0.70}>
            <Document title="Requerimientos del Sistema" author="Jose Francisco Mateo Carrasco">
              <Page style={styles.page} size="A4" orientation="portrait">
                <View style={{paddingLeft:5,margin:10}}>
                  <Text style={{fontSize:20,color:'blue'}}>REQUERIMIENTOS DEL SISTEMA</Text>
                </View>
                <View>                  
                  <View style={styles.rowTable}>
                       <View style={[styles.ColTable,styles.colCode]}><Text style={[styles.text,styles.textTitle]}>CÓDIGO</Text></View>
                      <View style={[styles.ColTable,styles.colDescription]}><Text style={[styles.textDescription,styles.textTitle]}>FUNCIÓN</Text></View>
                      <View style={[styles.ColTable,styles.colType]}><Text style={[styles.text,styles.textTitle]}>TIPO</Text></View>
                  </View>
                  {
                    this.props.requirements.map((r,key)=>{
                    return <View key={key} style={styles.rowTableChild}>
                      <View style={[styles.ColTable,styles.colCode]}><Text style={styles.text}>RQ-{key+1}</Text></View>
                      <View style={[styles.ColTable,styles.colDescription]}><Text style={styles.textDescription}>{r.description}</Text></View>
                      <View style={[styles.ColTable,styles.colType]}><Text style={styles.text}>{this.reformatType(r.type)}</Text></View>
                      
                      </View>
                    })
                  }
                  
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </React.Fragment>
      )
    } else {
      return <div><span>CARGANDO ...</span></div>
    }
  }
}

const styles = StyleSheet.create({
  page: {    
    backgroundColor: 'white',
    width:'100%',
    height:'100%',
    padding:30,
  },


  text:{
    textAlign:'center',
    fontSize:10 
  },  

  textDescription:{
    textAlign:'justify',
    fontSize:10,
  },
  
  textTitle:{
    fontWeight:'bold',
    textAlign:'center'
  },

  rowTable:{
    border: 1,    
    borderColor: 'black',
    display: 'flex',
    flexDirection:'row',
    marginBottom:0,
  },

  rowTableChild:{
    borderLeft:1,
    borderRight:1, 
    borderBottom:1,
    borderColor: 'black',
    display: 'flex',
    flexDirection:'row',
    marginBottom:0,
  },


  ColTable:{
    padding:5
  },

  

  colCode:{
    width:'15%'
  },
  colDescription:{
    borderLeft:1,
    borderRight:1,
    width:'70%'
  },
  colType:{
    width:'15%'
  },


});