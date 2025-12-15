package javaapplication7;

import com.toedter.calendar.JDateChooser;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import org.knowm.xchart.*;
import org.knowm.xchart.style.Styler;
import org.knowm.xchart.XChartPanel;
import org.knowm.xchart.style.PieStyler;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Font;
import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import java.io.File;
import java.io.FileOutputStream;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.awt.Color;
import org.knowm.xchart.internal.chartpart.Chart;

public class Form extends javax.swing.JFrame {

    private DefaultTableModel modelo;

    public Form() {
        setTitle("Dunder Mifflin");
        initComponents();
      setIconImage(new ImageIcon(getClass().getResource("/imagenes/icons8-company-48.png")).getImage());
        inicializarTabla();
        comboGraficos = new JComboBox<>(new String[]{
            "Gráfico de Pastel",
            "Gráfico de Barras",
            "Gráfico de Líneas",});
        jPanel1.add(comboGraficos, new org.netbeans.lib.awtextra.AbsoluteConstraints(900, 160, 150, 25));
    }

    private void inicializarTabla() {
        modelo = new DefaultTableModel();
        modelo.setColumnIdentifiers(new String[]{
            "Cliente", "Tipo de Servicio", "Ciudad Origen",
            "Ciudad Destino", "Fecha Reserva", "Ingreso (COP)"});
        jTable1.setModel(modelo);
    }
    private final JComboBox<String> comboGraficos;

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jSeparator1 = new javax.swing.JSeparator();
        jPanel1 = new javax.swing.JPanel();
        jScrollPane1 = new javax.swing.JScrollPane();
        jTable1 = new javax.swing.JTable();
        jPanel2 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        jPanel4 = new javax.swing.JPanel();
        jLabel4 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        jComboBox1 = new javax.swing.JComboBox<>();
        jTextField1 = new javax.swing.JTextField();
        jLabel6 = new javax.swing.JLabel();
        jLabel7 = new javax.swing.JLabel();
        jComboBox2 = new javax.swing.JComboBox<>();
        jComboBox3 = new javax.swing.JComboBox<>();
        jLabel8 = new javax.swing.JLabel();
        jButton2 = new javax.swing.JButton();
        jTextField4 = new javax.swing.JTextField();
        jButton1 = new javax.swing.JButton();
        jDateChooser1 = new com.toedter.calendar.JDateChooser();
        jLabel5 = new javax.swing.JLabel();
        jButton3 = new javax.swing.JButton();
        jButton4 = new javax.swing.JButton();
        jButton5 = new javax.swing.JButton();
        jButton8 = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        getContentPane().setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jPanel1.setBackground(new java.awt.Color(0, 0, 102));
        jPanel1.setLayout(new org.netbeans.lib.awtextra.AbsoluteLayout());

        jTable1.setForeground(new java.awt.Color(0, 0, 153));
        jTable1.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Tipo de Servicio", "Ciudad Origen", "Fecha Reserva", "Ingreso (COP)"
            }
        ));
        jScrollPane1.setViewportView(jTable1);

        jPanel1.add(jScrollPane1, new org.netbeans.lib.awtextra.AbsoluteConstraints(30, 400, 820, 200));

        jPanel2.setBackground(new java.awt.Color(0, 0, 102));

        jPanel4.setBackground(new java.awt.Color(255, 255, 255));

        jLabel4.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        jLabel4.setText("Fecha de la Reserva\t");

        jLabel3.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        jLabel3.setText("Tipo de servicio");

        jLabel2.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        jLabel2.setText("Nombre del Cliente / Usuario");

        jComboBox1.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Servicio Ejecutivo", "Servicio Compartido", "Envío de Paquetes" }));
        jComboBox1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jComboBox1ActionPerformed(evt);
            }
        });

        jTextField1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jTextField1ActionPerformed(evt);
            }
        });

        jLabel6.setText("Ciudad de Origen\t");

        jLabel7.setText("Ciudad de Destino\t");

        jComboBox2.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Bogotá", "Medellín", "Cali", "Barranquilla" }));

        jComboBox3.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Bogotá", "Medellín", "Cali", "Barranquilla" }));

        jLabel8.setText("Costo del Servicio");

        jButton2.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imagenes/icons8-add-60.png"))); // NOI18N
        jButton2.setText("Guardar");
        jButton2.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton2ActionPerformed(evt);
            }
        });

        jButton1.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imagenes/icons8-delete-60.png"))); // NOI18N
        jButton1.setText("Eliminar");
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel4Layout = new javax.swing.GroupLayout(jPanel4);
        jPanel4.setLayout(jPanel4Layout);
        jPanel4Layout.setHorizontalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addGap(33, 33, 33)
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 207, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jTextField1, javax.swing.GroupLayout.PREFERRED_SIZE, 190, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jComboBox1, javax.swing.GroupLayout.PREFERRED_SIZE, 190, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel3)
                    .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                        .addComponent(jDateChooser1, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(jLabel4, javax.swing.GroupLayout.Alignment.LEADING, javax.swing.GroupLayout.DEFAULT_SIZE, 190, Short.MAX_VALUE)))
                .addGap(105, 105, 105)
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(jTextField4)
                    .addComponent(jLabel7, javax.swing.GroupLayout.PREFERRED_SIZE, 122, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jComboBox3, 0, 190, Short.MAX_VALUE)
                    .addComponent(jComboBox2, 0, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jLabel6, javax.swing.GroupLayout.PREFERRED_SIZE, 100, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel8))
                .addGap(90, 90, 90)
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel4Layout.createSequentialGroup()
                        .addComponent(jButton2)
                        .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel4Layout.createSequentialGroup()
                        .addComponent(jButton1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addGap(646, 646, 646))))
        );
        jPanel4Layout.setVerticalGroup(
            jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel4Layout.createSequentialGroup()
                .addGap(31, 31, 31)
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel2)
                    .addComponent(jLabel6))
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel4Layout.createSequentialGroup()
                        .addGap(8, 8, 8)
                        .addComponent(jButton2)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jComboBox1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(jPanel4Layout.createSequentialGroup()
                        .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jTextField1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jComboBox2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(18, 18, 18)
                        .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel7)
                            .addComponent(jLabel3))
                        .addGap(18, 18, 18)
                        .addComponent(jComboBox3, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel4Layout.createSequentialGroup()
                        .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(jPanel4Layout.createSequentialGroup()
                                .addGap(21, 21, 21)
                                .addComponent(jLabel4))
                            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel4Layout.createSequentialGroup()
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(jLabel8)))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addGroup(jPanel4Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jTextField4, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jDateChooser1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addGroup(jPanel4Layout.createSequentialGroup()
                        .addGap(8, 8, 8)
                        .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 60, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addContainerGap(208, Short.MAX_VALUE))
        );

        jLabel5.setFont(new java.awt.Font("Impact", 0, 36)); // NOI18N
        jLabel5.setForeground(new java.awt.Color(255, 255, 255));
        jLabel5.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jLabel5.setText("Transporte Privado Dunder Mifflin ");

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGap(50, 50, 50)
                .addComponent(jLabel5, javax.swing.GroupLayout.PREFERRED_SIZE, 740, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(273, 273, 273)
                .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 287, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(jPanel4, javax.swing.GroupLayout.PREFERRED_SIZE, 1336, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(311, 311, 311))
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 33, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel5, javax.swing.GroupLayout.PREFERRED_SIZE, 61, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jPanel4, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        jPanel1.add(jPanel2, new org.netbeans.lib.awtextra.AbsoluteConstraints(20, 10, 830, 360));

        jButton3.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imagenes/icons8-receipt-64 (1).png"))); // NOI18N
        jButton3.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton3ActionPerformed(evt);
            }
        });
        jPanel1.add(jButton3, new org.netbeans.lib.awtextra.AbsoluteConstraints(890, 190, 100, 90));

        jButton4.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imagenes/icons8-export-64.png"))); // NOI18N
        jButton4.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton4ActionPerformed(evt);
            }
        });
        jPanel1.add(jButton4, new org.netbeans.lib.awtextra.AbsoluteConstraints(890, 440, 100, 90));

        jButton5.setIcon(new javax.swing.ImageIcon(getClass().getResource("/imagenes/icons8-graphic-64 (1).png"))); // NOI18N
        jButton5.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton5ActionPerformed(evt);
            }
        });
        jPanel1.add(jButton5, new org.netbeans.lib.awtextra.AbsoluteConstraints(890, 310, 100, 90));

        jButton8.setText("Archivo clientes");
        jButton8.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton8ActionPerformed(evt);
            }
        });
        jPanel1.add(jButton8, new org.netbeans.lib.awtextra.AbsoluteConstraints(870, 550, 130, -1));

        getContentPane().add(jPanel1, new org.netbeans.lib.awtextra.AbsoluteConstraints(0, 0, 1060, 640));

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void jTextField1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jTextField1ActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jTextField1ActionPerformed

    private void jComboBox1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jComboBox1ActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jComboBox1ActionPerformed

    private void jButton2ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton2ActionPerformed

        String cliente = jTextField1.getText();
        String tipoServicio = (String) jComboBox1.getSelectedItem();
        String ciudadOrigen = (String) jComboBox2.getSelectedItem();
        String ciudadDestino = (String) jComboBox3.getSelectedItem();
        String fechaReserva = "";

        if (jDateChooser1.getDate() != null) {
            fechaReserva = new java.text.SimpleDateFormat("yyyy-MM-dd").format(jDateChooser1.getDate());
        }

        String costo = jTextField4.getText();

        if (cliente.isEmpty() || fechaReserva.isEmpty() || costo.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Por favor, completa todos los campos obligatorios.");
            return;
        }

        modelo.addRow(new Object[]{cliente, tipoServicio, ciudadOrigen, ciudadDestino, fechaReserva, costo});
        limpiarFormulario();
    }

    private void limpiarFormulario() {
        jTextField1.setText("");
        jComboBox1.setSelectedIndex(0);
        jComboBox2.setSelectedIndex(0);
        jComboBox3.setSelectedIndex(0);
        jDateChooser1.setDate(null);
        jTextField4.setText("");

    }//GEN-LAST:event_jButton2ActionPerformed

    private void jButton3ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton3ActionPerformed
        try {
            int fila = jTable1.getSelectedRow();
            if (fila < 0) {
                JOptionPane.showMessageDialog(this,
                        "Seleccione un registro primero",
                        "Advertencia",
                        JOptionPane.WARNING_MESSAGE);
                return;
            }

            DefaultTableModel modelo = (DefaultTableModel) jTable1.getModel();
            String cliente = modelo.getValueAt(fila, 0).toString();
            String servicio = modelo.getValueAt(fila, 1).toString();
            String origen = modelo.getValueAt(fila, 2).toString();
            String destino = modelo.getValueAt(fila, 3).toString();
            String fecha = modelo.getValueAt(fila, 4).toString();
            String precio = modelo.getValueAt(fila, 5).toString();

            String carpetaBase = System.getProperty("user.home") + File.separator + "Documentos" + File.separator + "RecibosDunderMifflin";
            File carpeta = new File(carpetaBase);

            if (!carpeta.exists()) {
                if (!carpeta.mkdirs()) {
                    throw new IOException("No se pudo crear la carpeta: " + carpetaBase);
                }
            }

            String nombreArchivo = "Recibo_" + cliente.replaceAll("[^a-zA-Z0-9]", "_") + "_" + System.currentTimeMillis() + ".pdf";
            String rutaCompleta = carpetaBase + File.separator + nombreArchivo;

            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream(rutaCompleta));
            document.open();

            Font fontTitulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, BaseColor.DARK_GRAY);
            Paragraph titulo = new Paragraph("RECIBO OFICIAL\n\n", fontTitulo);
            titulo.setAlignment(Element.ALIGN_CENTER);
            document.add(titulo);

            PdfPTable tabla = new PdfPTable(2);
            tabla.setWidthPercentage(90);

            agregarCelda(tabla, "Cliente:", cliente, true);
            agregarCelda(tabla, "Servicio:", servicio, false);
            agregarCelda(tabla, "Ruta:", origen + " → " + destino, false);
            agregarCelda(tabla, "Fecha:", fecha, false);
            agregarCelda(tabla, "Total:", "$" + precio + " COP", true);

            document.add(tabla);
            document.close();

            if (!new File(rutaCompleta).exists()) {
                throw new IOException("El archivo no se generó en: " + rutaCompleta);
            }

            int opcion = JOptionPane.showConfirmDialog(this,
                    "PDF generado con éxito en:\n" + rutaCompleta + "\n\n¿Desea abrir el archivo?",
                    "Éxito",
                    JOptionPane.YES_NO_OPTION);

            if (opcion == JOptionPane.YES_OPTION) {
                Desktop.getDesktop().open(new File(rutaCompleta));
            }

        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,
                    "Error al generar PDF:\n" + e.getMessage()
                    + "\n\nRecomendación: Verifique los permisos de escritura o intente otra ubicación.",
                    "Error Crítico",
                    JOptionPane.ERROR_MESSAGE);
        }
    }

    private void agregarCelda(PdfPTable tabla, String titulo, String valor, boolean esImportante) {
        Font font = esImportante
                ? FontFactory.getFont(FontFactory.HELVETICA_BOLD)
                : FontFactory.getFont(FontFactory.HELVETICA);

        PdfPCell celdaTitulo = new PdfPCell(new Phrase(titulo, font));
        celdaTitulo.setBackgroundColor(new BaseColor(240, 240, 240));
        celdaTitulo.setBorderWidth(1f);

        PdfPCell celdaValor = new PdfPCell(new Phrase(valor, font));
        celdaValor.setBorderWidth(1f);

        tabla.addCell(celdaTitulo);
        tabla.addCell(celdaValor);
    }//GEN-LAST:event_jButton3ActionPerformed

    private void jButton4ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton4ActionPerformed
        System.exit(0);

    }//GEN-LAST:event_jButton4ActionPerformed

    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed

        int fila = jTable1.getSelectedRow();
        if (fila >= 0) {
            DefaultTableModel modelo = (DefaultTableModel) jTable1.getModel();
            modelo.removeRow(fila);
        } else {
            JOptionPane.showMessageDialog(this, "Selecciona una fila para eliminar.");
        }

    }//GEN-LAST:event_jButton1ActionPerformed

    private void jButton5ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton5ActionPerformed
        if (jTable1.getRowCount() == 0) {
            JOptionPane.showMessageDialog(this,
                    "No hay datos para generar el gráfico",
                    "Advertencia",
                    JOptionPane.WARNING_MESSAGE);
            return;
        }

        String tipoGrafico = (String) comboGraficos.getSelectedItem();

        try {
            switch (tipoGrafico) {
                case "Gráfico de Pastel":
                    mostrarGraficoPastel();
                    break;
                case "Gráfico de Barras":
                    mostrarGraficoBarras();
                    break;
                case "Gráfico de Líneas":
                    mostrarGraficoLineas();
                    break;
                default:
                    mostrarGraficoPastel();
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,
                    "Error al generar gráfico: " + e.getMessage(),
                    "Error",
                    JOptionPane.ERROR_MESSAGE);
        }
    }//GEN-LAST:event_jButton5ActionPerformed

    private void jButton8ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton8ActionPerformed

        String[] opciones = {"Guardar datos", "Cargar datos"};
        int seleccion = JOptionPane.showOptionDialog(this,
                "Seleccione una acción:",
                "Gestión de Archivos",
                JOptionPane.DEFAULT_OPTION,
                JOptionPane.QUESTION_MESSAGE,
                null,
                opciones,
                opciones[0]);

        if (seleccion == 0) {
            guardarDatosEnArchivo();
        } else if (seleccion == 1) {
            cargarDatosDesdeArchivo();
        }
    }

    private void mostrarGraficoPastel() {
        DefaultTableModel model = (DefaultTableModel) jTable1.getModel();
        Map<String, Double> ingresosPorServicio = new HashMap<>();

        for (int i = 0; i < model.getRowCount(); i++) {
            String tipo = model.getValueAt(i, 1).toString();
            double ingreso = Double.parseDouble(model.getValueAt(i, 5).toString());
            ingresosPorServicio.merge(tipo, ingreso, Double::sum);
        }

        PieChart chart = new PieChartBuilder()
                .width(800)
                .height(600)
                .title("Ingresos por Tipo de Servicio")
                .build();

        PieStyler styler = chart.getStyler();
        styler.setLegendVisible(true);
        styler.setLabelsVisible(true);
        styler.setLabelType(PieStyler.LabelType.NameAndPercentage);
        styler.setPlotContentSize(0.7);
        styler.setCircular(true);
        styler.setSeriesColors(new Color[]{
            new Color(79, 129, 189),
            new Color(192, 80, 77),
            new Color(155, 187, 89)
        });

        ingresosPorServicio.forEach(chart::addSeries);

        mostrarGraficoEnFrame(chart);
    }

    private void mostrarGraficoLineas() {

        double[] xData = new double[]{1, 2, 3, 4, 5};
        double[] yData = new double[]{100000, 200000, 150000, 300000, 250000};

        XYChart chart = new XYChartBuilder()
                .width(800)
                .height(600)
                .title("Tendencia de Ingresos")
                .xAxisTitle("Semana")
                .yAxisTitle("Ingresos (COP)")
                .build();

        chart.getStyler().setDefaultSeriesRenderStyle(XYSeries.XYSeriesRenderStyle.Line);
        chart.getStyler().setMarkerSize(8);
        chart.getStyler().setCursorEnabled(true);

        chart.addSeries("Ingresos semanales", xData, yData);

        mostrarGraficoEnFrame(chart);
    }

    private void mostrarGraficoBarras() {
        DefaultTableModel model = (DefaultTableModel) jTable1.getModel();
        Map<String, Double> ingresosPorCiudad = new HashMap<>();

        for (int i = 0; i < model.getRowCount(); i++) {
            String ciudad = model.getValueAt(i, 2).toString(); // Ciudad origen
            double ingreso = Double.parseDouble(model.getValueAt(i, 5).toString());
            ingresosPorCiudad.merge(ciudad, ingreso, Double::sum);
        }

        CategoryChart chart = new CategoryChartBuilder()
                .width(800)
                .height(600)
                .title("Ingresos por Ciudad de Origen")
                .xAxisTitle("Ciudad")
                .yAxisTitle("Ingresos (COP)")
                .build();

        chart.getStyler().setLegendPosition(Styler.LegendPosition.InsideNW);
        chart.getStyler().setAvailableSpaceFill(0.5);
        chart.getStyler().setOverlapped(true);
        chart.getStyler().setXAxisLabelRotation(45);

        chart.addSeries("Ingresos",
                new ArrayList<>(ingresosPorCiudad.keySet()),
                new ArrayList<>(ingresosPorCiudad.values()));

        mostrarGraficoEnFrame(chart);
    }

    private void guardarDatosEnArchivo() {
        JFileChooser fileChooser = new JFileChooser();
        fileChooser.setDialogTitle("Guardar datos de reservas");
        fileChooser.setSelectedFile(new File("reservas_datos.json"));

        int userSelection = fileChooser.showSaveDialog(this);

        if (userSelection == JFileChooser.APPROVE_OPTION) {
            File fileToSave = fileChooser.getSelectedFile();
            try {

                List<Map<String, String>> datos = new ArrayList<>();
                DefaultTableModel model = (DefaultTableModel) jTable1.getModel();

                for (int i = 0; i < model.getRowCount(); i++) {
                    Map<String, String> fila = new HashMap<>();
                    fila.put("cliente", model.getValueAt(i, 0).toString());
                    fila.put("tipoServicio", model.getValueAt(i, 1).toString());
                    fila.put("ciudadOrigen", model.getValueAt(i, 2).toString());
                    fila.put("ciudadDestino", model.getValueAt(i, 3).toString());
                    fila.put("fechaReserva", model.getValueAt(i, 4).toString());
                    fila.put("ingreso", model.getValueAt(i, 5).toString());
                    datos.add(fila);
                }

                try (FileWriter writer = new FileWriter(fileToSave)) {
                    new Gson().toJson(datos, writer);
                }

                JOptionPane.showMessageDialog(this,
                        "Datos guardados exitosamente en: " + fileToSave.getAbsolutePath());

            } catch (IOException e) {
                JOptionPane.showMessageDialog(this,
                        "Error al guardar archivo: " + e.getMessage(),
                        "Error",
                        JOptionPane.ERROR_MESSAGE);
            }
        }
    }

    private void cargarDatosDesdeArchivo() {
        JFileChooser fileChooser = new JFileChooser();
        fileChooser.setDialogTitle("Cargar datos de reservas");

        int userSelection = fileChooser.showOpenDialog(this);

        if (userSelection == JFileChooser.APPROVE_OPTION) {
            File fileToLoad = fileChooser.getSelectedFile();
            try {

                List<Map<String, String>> datos;
                try (FileReader reader = new FileReader(fileToLoad)) {
                    datos = new Gson().fromJson(
                            reader,
                            new TypeToken<List<Map<String, String>>>() {
                            }.getType()
                    );
                }

                if (datos == null || datos.isEmpty()) {
                    JOptionPane.showMessageDialog(this,
                            "El archivo está vacío o no contiene datos válidos");
                    return;
                }

                DefaultTableModel model = (DefaultTableModel) jTable1.getModel();
                model.setRowCount(0);

                for (Map<String, String> fila : datos) {
                    model.addRow(new Object[]{
                        fila.get("cliente"),
                        fila.get("tipoServicio"),
                        fila.get("ciudadOrigen"),
                        fila.get("ciudadDestino"),
                        fila.get("fechaReserva"),
                        fila.get("ingreso")
                    });
                }

                JOptionPane.showMessageDialog(this,
                        "Datos cargados exitosamente desde: " + fileToLoad.getAbsolutePath());

            } catch (IOException e) {
                JOptionPane.showMessageDialog(this,
                        "Error al leer archivo: " + e.getMessage(),
                        "Error",
                        JOptionPane.ERROR_MESSAGE);
            } catch (Exception e) {
                JOptionPane.showMessageDialog(this,
                        "Formato de archivo inválido: " + e.getMessage(),
                        "Error",
                        JOptionPane.ERROR_MESSAGE);
            }
        }
    }//GEN-LAST:event_jButton8ActionPerformed

    private void guardarClienteEnJSON(Cliente cliente) {
        try {

            File archivo = new File("clientes.json");
            List<Cliente> clientes = new ArrayList<>();

            if (archivo.exists()) {
                clientes = new Gson().fromJson(new FileReader(archivo),
                        new TypeToken<List<Cliente>>() {
                        }.getType());
            }

            clientes.add(cliente);

            try (FileWriter writer = new FileWriter(archivo)) {
                new Gson().toJson(clientes, writer);
            }

            JOptionPane.showMessageDialog(this, "Cliente guardado con éxito!");
        } catch (IOException e) {
            JOptionPane.showMessageDialog(this, "Error al guardar: " + e.getMessage());
        }
    }

    private void mostrarGraficoEnFrame(XChartPanel<?> chartPanel) {
        JFrame frame = new JFrame("Visualización de Datos");
        frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        frame.add(chartPanel);
        frame.pack();
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }

    private void mostrarGraficoEnFrame(Chart<?, ?> chart) {
        mostrarGraficoEnFrame(new XChartPanel<>(chart));
    }

    public static void main(String args[]) {
        SwingUtilities.invokeLater(() -> {
            new Form().setVisible(true);
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton jButton1;
    private javax.swing.JButton jButton2;
    private javax.swing.JButton jButton3;
    private javax.swing.JButton jButton4;
    private javax.swing.JButton jButton5;
    private javax.swing.JButton jButton8;
    private javax.swing.JComboBox<String> jComboBox1;
    private javax.swing.JComboBox<String> jComboBox2;
    private javax.swing.JComboBox<String> jComboBox3;
    private com.toedter.calendar.JDateChooser jDateChooser1;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel8;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JPanel jPanel4;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JSeparator jSeparator1;
    private javax.swing.JTable jTable1;
    private javax.swing.JTextField jTextField1;
    private javax.swing.JTextField jTextField4;
    // End of variables declaration//GEN-END:variables

  
}
