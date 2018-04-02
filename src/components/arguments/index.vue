<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane :label="$t('ar.jgrd')" name="first" v-if="userInfo.level == 0 ">
				<el-table :data="tableBlownData" stripe style="width: 800px">
					<el-table-column prop="id" label="#" align="center" width="100px">
					</el-table-column>
					<el-table-column prop="level_name" :label="$t('ar.jt')" align="center" width="200px">
					</el-table-column>
					<el-table-column prop="price_percentage" :label="$t('ar.jgfd')" align="center" width="100px">
					</el-table-column>
					<el-table-column prop="duration" :label="$t('ar.jgcxsj')" align="center" width="200px">
					</el-table-column>
					<el-table-column :label="$t('ar.cz')" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row,'first')">
								{{$t('ar.xg')}}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane :label="$t('ar.jyqx')" name="second" v-if="userInfo.level == 0 ">
				<el-table :data="tableTradingPermissionsData" stripe style="width: 962px">
					<el-table-column prop="id" label="#" align="center" width="80px">
					</el-table-column>
					<el-table-column prop="level_name" :label="$t('ar.spmc')" align="center" width="100px">
						<template slot-scope="scope">
							{{ $t('ar.btc') }}
						</template>
					</el-table-column>
					<el-table-column prop="price_percentage" :label="$t('ar.lx')" align="center" width="100px">
						<template slot-scope="scope">
							{{ scope.row.type == 1 ? $t('ar.xj') : $t('ar.xy') }}
						</template>
					</el-table-column>
					<el-table-column prop="duration" :label="$t('ar.xsqx')" align="center" width="100px">
						<template slot-scope="scope">
							{{ scope.row.show_flag == 1 ? $t('ar.you'): $t('ar.wu') }}
						</template>
					</el-table-column>
					<el-table-column :label="$t('ar.jc')" name="second" align="center">
						<el-table-column prop="duration" :label="$t('ar.gdmr')" align="center" width="80px">
							<template slot-scope="scope">
								{{ scope.row.open_order_buy == 1 ?$t('ar.you'): $t('ar.wu')}}
							</template>
						</el-table-column>
						<el-table-column prop="duration" :label="$t('ar.gdmc')" align="center" width="80px">
							<template slot-scope="scope">
								{{ scope.row.open_order_sale == 1 ? $t('ar.you'): $t('ar.wu') }}
							</template>
						</el-table-column>
						<el-table-column prop="duration" :label="$t('ar.gdcx')" align="center" width="80px">
							<template slot-scope="scope">
								{{ scope.row.open_order_undo == 1 ? $t('ar.you'): $t('ar.wu') }}
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column :label="$t('ar.pc')" name="second" align="center">
						<el-table-column prop="duration" :label="$t('ar.gdmr')" align="center" width="80px">
							<template slot-scope="scope">
								{{ scope.row.close_order_buy == 1 ? $t('ar.you'): $t('ar.wu') }}
							</template>
						</el-table-column>
						<el-table-column prop="duration" :label="$t('ar.gdmc')" align="center" width="80px">
							<template slot-scope="scope">
								{{ scope.row.close_order_sale == 1 ? $t('ar.you'): $t('ar.wu') }}
							</template>
						</el-table-column>
						<el-table-column prop="duration" :label="$t('ar.gdcx')" align="center" width="80px">
							<template slot-scope="scope">
								{{ scope.row.close_order_undo == 1 ? $t('ar.you'): $t('ar.wu') }}
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column :label="$t('ar.cz')" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row,'second')">{{$t('ar.xg')}}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane :label="$t('ar.bzj')" name="third" v-if="userInfo.level == 0 ">
				<el-table :data="tableDepositData" stripe style="width: 800px">
					<el-table-column prop="id" label="#" align="center" width="100px">
					</el-table-column>
					<el-table-column prop="level_name" :label="$t('ar.spmc')" align="center" width="100px">
						<template slot-scope="scope">
							{{ $t('ar.btc') }}
						</template>
					</el-table-column>
					<el-table-column prop="price_percentage" :label="$t('ar.lx')" align="center" width="100px">
						<template slot-scope="scope">
							{{ scope.row.type == 1 ? $t('ar.xj') : $t('ar.xy') }}
						</template>
					</el-table-column>
					<el-table-column prop="single_frozen_percentage" :label="$t('ar.bzjsf')" align="center" width="100px">
						<template slot-scope="scope">
							{{ $t('ar.bl') }}
						</template>
					</el-table-column>
					<el-table-column prop="single_frozen_percentage" :label="$t('ar.dbdjbzj')" align="center" width="150px">
						<template slot-scope="scope">
							{{ scope.row.single_frozen_percentage + "%" }}
						</template>
					</el-table-column>
					<el-table-column prop="single_used_percentage" :label="$t('ar.dbzybzj')" align="center" width="150px">
						<template slot-scope="scope">
							{{ scope.row.single_used_percentage + "%" }}
						</template>
					</el-table-column>
					<el-table-column :label="$t('ar.cz')" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row,'third')">{{ $t('ar.xg') }}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane :label="$t('ar.sxf')" name="fourth" v-if="userInfo.level == 0 ">
				<el-table :data="tableServiceFeeData" stripe style="width: 962px">
					<el-table-column prop="id" label="#" align="center" width="80px">
					</el-table-column>
					<el-table-column prop="level_name" :label="$t('ar.spmc')" align="center" width="100px">
						<template slot-scope="scope">
							{{ $t('ar.btc') }}
						</template>
					</el-table-column>
					<el-table-column prop="price_percentage" :label="$t('ar.lx')" align="center" width="100px">
						<template slot-scope="scope">
							{{ scope.row.type == 1 ? $t('ar.xj') : $t('ar.xy') }}
						</template>
					</el-table-column>
					<el-table-column prop="duration" :label="$t('ar.sxfsf')" align="center" width="100px">
						<template slot-scope="scope">
							{{ $t('ar.bl') }}
						</template>
					</el-table-column>
					<el-table-column :label="$t('ar.dbmrjcsxf')" name="second" align="center">
						<el-table-column prop="duration" :label="$t('ar.jcsxf')" align="center" width="120px">
							<template slot-scope="scope">
								{{ scope.row.single_open_percentage + "%" }}
							</template>
						</el-table-column>
						<el-table-column prop="duration" :label="$t('ar.sxf')" align="center" width="120px">
							<template slot-scope="scope">
								{{ scope.row.single_open_limit_percentage + "%" }}
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column :label="$t('ar.dbmrpcsxf')" name="second" align="center">
						<el-table-column prop="duration" :label="$t('ar.pcsxf')" align="center" width="120px">
							<template slot-scope="scope">
								{{ scope.row.single_close_percentage + "%" }}
							</template>
						</el-table-column>
						<el-table-column prop="duration" :label="$t('ar.sxf')" align="center" width="120px">
							<template slot-scope="scope">
								{{ scope.row.single_close_limit_percentage + "%" }}
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column :label="$t('ar.cz')" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row,'fourth')">修改
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane :label="$t('ar.gyf')" name="five" v-if="userInfo.level == 0 ">
				<el-table :data="tableOvernightFeeData" stripe style="width: 880px">
					<el-table-column prop="id" label="#" align="center" width="60px">
					</el-table-column>
					<el-table-column prop="level_name" :label="$t('ar.spmc')" align="center" width="100px">
						<template slot-scope="scope">
							{{ $t('ar.btc') }}
						</template>
					</el-table-column>
					<el-table-column prop="price_percentage" :label="$t('ar.lx')" align="center" width="100px">
						<template slot-scope="scope">
							{{ scope.row.type == 1 ? $t('ar.xj') : $t('ar.xy') }}
						</template>
					</el-table-column>
					<el-table-column prop="duration" :label="$t('ar.sqfs')" align="center" width="120px">
						<template slot-scope="scope">
							{{ scope.row.charge_mode == 1 ? $t('ar.ar') : $t('ar.ac') }}
						</template>
					</el-table-column>
					<el-table-column prop="duration" :label="$t('ar.gyfsf')" align="center" width="120px">
						<template slot-scope="scope">
							{{ $t('ar.bl') }}
						</template>
					</el-table-column>
					<el-table-column prop="duration" :label="$t('ar.mrgyf')" align="center" width="120px">
						<template slot-scope="scope">
							{{ scope.row.buy_percentage + "%" }}
						</template>
					</el-table-column>
					<el-table-column prop="duration" :label="$t('ar.mcgyf')" align="center" width="120px">
						<template slot-scope="scope">
							{{ scope.row.sale_percentage + "%" }}
						</template>
					</el-table-column>
					<el-table-column :label="$t('ar.cz')" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row,'five')">{{$t('ar.xg')}}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane :label="$t('ar.ccsl')" name="six" v-if="userInfo.level == 0 ">
				<el-table :data="tableorderLimitData" stripe style="width: 980px">
					<el-table-column prop="id" label="#" align="center" width="60px">
					</el-table-column>
					<el-table-column prop="level_name" :label="$t('ar.spmc')" align="center" width="100px">
						<template slot-scope="scope">
							{{ $t('ar.btc')}}
						</template>
					</el-table-column>
					<el-table-column prop="price_percentage" :label="$t('ar.lx')" align="center" width="100px">
						<template slot-scope="scope">
							{{ scope.row.type == 1 ? $t('ar.xj') : $t('ar.xy') }}
						</template>
					</el-table-column>
					<el-table-column prop="duration" :label="$t('ar.dbzxjyl')" align="center" width="120px">
						<template slot-scope="scope">
							{{ scope.row.single_min_transaction }}
						</template>
					</el-table-column>
					<el-table-column prop="duration" :label="$t('ar.dbzdjyl')" align="center" width="120px">
						<template slot-scope="scope">
							{{ scope.row.single_max_transaction }}
						</template>
					</el-table-column>
					<el-table-column prop="duration" :label="$t('ar.zdmchl')" align="center" width="120px">
						<template slot-scope="scope">
							{{ scope.row.max_buy_limit }}
						</template>
					</el-table-column>
					<el-table-column prop="duration" :label="$t('ar.zdMchl')" align="center" width="120px">
						<template slot-scope="scope">
							{{ scope.row.max_sale_limit }}
						</template>
					</el-table-column>
					<el-table-column prop="duration" :label="$t('ar.zdjchl')" align="center" width="120px">
						<template slot-scope="scope">
							{{ scope.row.max_net_limit }}
						</template>
					</el-table-column>
					<el-table-column :label="$t('ar.cz')" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row,'six')">{{$t('ar.xg')}}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane :label="$t('ar.fxyz')" name="seven">
				<el-row :gutter="20">
					<el-col :span="10" :offset="1">
						<el-card class="box-card" style="height: 280px;">
							<div slot="header" class="clearfix">
								<span>{{$t('ar.xyms')}}</span>
							</div>
							<div style="width: 400px;">
								<el-form ref="form" :model="form" label-width="150px">
									<el-form-item :label="$t('ar.hyyjbcbl')">
										<el-input v-model="form.xy_call_margin_warn_percentage" size="small" :disabled="userInfo.level != 0">
											<template slot="append">%</template>
										</el-input>
									</el-form-item>
									<el-form-item :label="$t('ar.hyyjzcbl')">
										<el-input v-model="form.xy_cut_margin_warn_percentage" size="small" :disabled="userInfo.level != 0">
											<template slot="append">%</template>
										</el-input>
									</el-form-item>
									<el-form-item>
									</el-form-item>
								</el-form>
							</div>
						</el-card>
					</el-col>
					<el-col :span="10" :offset="1">
						<el-card class="box-card" style="height: 280px;">
							<div slot="header" class="clearfix">
								<span>{{$t('ar.xjms')}}</span>
							</div>
							<div style="width: 400px;">
								<el-form ref="form" :model="form" label-width="150px">
									<el-form-item :label="$t('ar.hyyjbcbl')">
										<el-input v-model="form.xj_call_margin_warn_percentage" size="small" :disabled="userInfo.level != 0">
											<template slot="append">%</template>
										</el-input>
									</el-form-item>
									<el-form-item :label="$t('ar.hyyjzcbl')">
										<el-input v-model="form.xj_cut_margin_warn_percentage" size="small" :disabled="userInfo.level != 0">
											<template slot="append">%</template>
										</el-input>
									</el-form-item>
									<el-form-item :label="$t('ar.hyzdylbl')">
										<el-input v-model="form.max_win_percentage" size="small" :disabled="userInfo.level != 0">
											<template slot="append">%</template>
										</el-input>
									</el-form-item>
								</el-form>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<div style="margin-top: 20px;text-align: center">
							<el-button type="primary" @click="onRiskSubmit(form,'seven')" :disabled="userInfo.level != 0">{{$t('ar.bc')}}</el-button>
							<el-button @click="getData('seven')">{{$t('ar.sx')}}</el-button>
						</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane :label="$t('ar.bjdc')" name="eight" v-if="userInfo.level == 0 ">
				<el-table :data="tableorderDiffData" stripe style="width: 560px">
					<el-table-column prop="id" label="#" align="center" width="60px">
					</el-table-column>
					<el-table-column prop="level_name" :label="$t('ar.spmc')" align="center" width="100px">
						<template slot-scope="scope">
							{{ $t('ar.btc') }}
						</template>
					</el-table-column>
					<el-table-column prop="price_percentage" :label="$t('ar.lx')" align="center" width="100px">
						<template slot-scope="scope">
							{{ scope.row.type == 1 ? $t('ar.xj') : $t('ar.xy') }}
						</template>
					</el-table-column>
					<el-table-column prop="order_diff" :label="$t('ar.bjdc')" align="center" width="120px">
					</el-table-column>
					<el-table-column :label="$t('ar.cz')" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row,'eight')">{{$t('ar.xg')}}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane :label="$t('ar.shsz')" name="night" v-if="userInfo.level == 0 ">
				<el-table :data="tableReviewData" stripe style="width: 700px">
					<el-table-column prop="id" label="#" align="center" width="60px">
					</el-table-column>
					<el-table-column prop="level_name" :label="$t('ar.spmc')" align="center" width="100px">
						<template slot-scope="scope">
							{{ $t('ar.btc')}}
						</template>
					</el-table-column>
					<el-table-column prop="price_percentage" :label="$t('ar.lx')" align="center" width="100px">
						<template slot-scope="scope">
							{{ scope.row.type == 1 ? $t('ar.xj') : $t('ar.xy') }}
						</template>
					</el-table-column>
					<el-table-column prop="small_limit" :label="$t('ar.msh')" align="center" width="120px">
					</el-table-column>
					<el-table-column prop="big_limit" :label="$t('ar.ddzsh')" align="center" width="120px">
					</el-table-column>
					<el-table-column :label="$t('ar.cz')" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row,'night')">{{$t('ar.xg')}}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane :label="$t('ar.hlsz')" name="ten" v-if="userInfo.level == 0 ">
				<el-table :data="tableExchangeRateData" stripe style="width: 560px">
					<el-table-column prop="id" label="#" align="center" width="60px">
					</el-table-column>
					<el-table-column prop="level_name" :label="$t('ar.spmc')" align="center" width="100px">
						<template slot-scope="scope">
							{{ $t('ar.btc') }}
						</template>
					</el-table-column>
					<el-table-column prop="price_percentage" :label="$t('ar.lx')" align="center" width="100px">
						<template slot-scope="scope">
							{{ scope.row.type == 1 ? $t('ar.xj') : $t('ar.xy') }}
						</template>
					</el-table-column>
					<el-table-column prop="exchange_rate" :label="$t('ar.mjhl')" align="center" width="120px">
					</el-table-column>
					<el-table-column :label="$t('ar.cz')" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row,'ten')">{{$t('ar.xg')}}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane :label="$t('ar.zdchl')" name="eleven" v-if="userInfo.level">
				<el-table :data="tableOrderTotalData" stripe style="width: 560px">
					<el-table-column prop="id" label="#" align="center" width="60px">
					</el-table-column>
					<el-table-column prop="level_name" :label="$t('ar.spmc')" align="center" width="100px">
						<template slot-scope="scope">
							{{ $t('ar.btc')}}
						</template>
					</el-table-column>
					<el-table-column prop="item_number" :label="$t('ar.zdchl')" align="center" width="120px">
					</el-table-column>
					<el-table-column :label="$t('ar.cz')" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row,'eleven')">{{ $t('ar.xg') }}
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		<!-- 各个设置的弹窗部份 -->
		<el-dialog :title="dialogTitle" :visible.sync="dialogPriceVisible" :width="dialogWidth" close-on-click-modal="true" top="0">
			<el-form ref="dialogData" :model="dialogData" label-width="180px">
				<!-- 价格熔断部份 -->
				<div v-if="dialogType=='first'">
					<el-form-item :label="$t('ar.jt')+': '">
						<el-input v-model="dialogData.level_name" size="small" :disabled="true">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.jgfd')+': '">
						<el-select v-model="dialogData.price_percentage" :placeholder="$t('ar.qxz')">
							<el-option size="small" v-for="item in priceSteps" :key="item" :label="item + '%'" :value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label="$t('ar.jgcxsj')+': '">
						<el-input-number size="mini" v-model="dialogData.duration" :min="0" :max="60"></el-input-number>
					</el-form-item>
				</div>
				<!-- 交易权限部份 -->
				<div v-if="dialogType=='second'">
					<el-form-item :label="$t('ar.spmc')+': '">
						<el-input size="small" :disabled="true" :value="$t('ar.btc')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.lx')+': '">
						<el-input size="small" :disabled="true" v-bind:value="dialogData.type == 1 ? $t('ar.xj') : $t('ar.xy')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.xsqx')+': '">
						<el-select v-model="dialogData.show_flag" :placeholder="$t('ar.qxz')">
							<el-option size="small" v-for="item in privilegesOption" :key="item.k" :label="item.v" :value="item.k">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label="$t('ar.jcgdmr')+': '">
						<el-select v-model="dialogData.open_order_buy" :placeholder="$t('ar.qxz')">
							<el-option size="small" v-for="item in privilegesOption" :key="item.k" :label="item.v" :value="item.k">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label="$t('ar.jcgdmc')+': '">
						<el-select v-model="dialogData.open_order_sale" :placeholder="$t('ar.qxz')">
							<el-option size="small" v-for="item in privilegesOption" :key="item.k" :label="item.v" :value="item.k">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label="$t('ar.jcgdcx')+': '">
						<el-select v-model="dialogData.open_order_undo" :placeholder="$t('ar.qxz')">
							<el-option size="small" v-for="item in privilegesOption" :key="item.k" :label="item.v" :value="item.k">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label="$t('ar.pcgdmr')+': '">
						<el-select v-model="dialogData.close_order_buy" :placeholder="$t('ar.qxz')">
							<el-option size="small" v-for="item in privilegesOption" :key="item.k" :label="item.v" :value="item.k">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label="$t('ar.pcgdmc')+': '">
						<el-select v-model="dialogData.close_order_sale" :placeholder="$t('ar.qxz')">
							<el-option size="small" v-for="item in privilegesOption" :key="item.k" :label="item.v" :value="item.k">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label="$t('ar.pcgdcx')+': '">
						<el-select v-model="dialogData.close_order_undo" :placeholder="$t('ar.qxz')">
							<el-option size="small" v-for="item in privilegesOption" :key="item.k" :label="item.v" :value="item.k">
							</el-option>
						</el-select>
					</el-form-item>
				</div>
				<!-- 保证金部份 -->
				<div v-if="dialogType=='third'">
					<el-form-item :label="$t('ar.spmc')+': '">
						<el-input size="small" :disabled="true" :value="$t('ar.btc')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.lx')+': '">
						<el-input size="small" :disabled="true" v-bind:value="dialogData.type == 1 ? $t('ar.xj') : $t('ar.xy')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.bzjsf')+': '">
						<el-input size="small" :disabled="true" :value="$t('ar.bl')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.dbdjbzj')+': '">
						<el-select v-model="dialogData.single_frozen_percentage" :placeholder="$t('ar.qxz')">
							<el-option size="small" v-for="item in priceSteps" :key="item" :label="item + '%'" :value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label="$t('ar.dbzybzj')+': '">
						<el-select v-model="dialogData.single_used_percentage" :placeholder="$t('ar.qxz')">
							<el-option size="small" v-for="item in priceSteps" :key="item" :label="item + '%'" :value="item">
							</el-option>
						</el-select>
					</el-form-item>
				</div>
				<!-- 手续费部份 -->
				<div v-if="dialogType=='fourth'">
					<el-form-item :label="$t('ar.spmc')+': '">
						<el-input size="small" :disabled="true" :value="$t('ar.btc')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.lx')+': '">
						<el-input size="small" :disabled="true" v-bind:value="dialogData.type == 1 ? $t('ar.xj') : $t('ar.xy')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.sxfsf')+': '">
						<el-input size="small" :disabled="true" :value="$t('ar.btc')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.dbmrjcsxf')+': '">
						<el-input v-model="dialogData.single_open_percentage" size="small">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.dbjcsxfsx')+': '">
						<el-input v-model="dialogData.single_open_limit_percentage" size="small">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.dbmrpcsxf')+': '">
						<el-input v-model="dialogData.single_close_percentage" size="small">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.dbpcsxfsx')+': '">
						<el-input v-model="dialogData.single_close_limit_percentage" size="small">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
				</div>
				<!-- 过夜费部份 -->
				<div v-if="dialogType=='five'">
					<el-form-item :label="$t('ar.spmc')+': '">
						<el-input size="small" :disabled="true" :value="$t('ar.btc')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.lx')+': '">
						<el-input size="small" :disabled="true" v-bind:value="dialogData.type == 1 ? $t('ar.xj') : $t('ar.xy')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.gyfsf')+': '">
						<el-input size="small" :disabled="true" :value="$t('ar.bl')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.dbdjbzj')+': '">
						<el-select v-model="dialogData.charge_mode" :placeholder="$t('ar.qxz')">
							<el-option size="small" v-for="item in overnightOption" :key="item.k" :label="item.v" :value="item.k">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label="$t('ar.mrgyf')+': '">
						<el-input v-model="dialogData.buy_percentage" size="small">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.mcgyf')+': '">
						<el-input v-model="dialogData.sale_percentage" size="small">
							<template slot="append">%</template>
						</el-input>
					</el-form-item>
				</div>
				<!-- 持货量部份 -->
				<div v-if="dialogType=='six'">
					<el-form-item :label="$t('ar.spmc')+': '">
						<el-input size="small" :disabled="true" :value="$t('ar.btc')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.lx')+': '">
						<el-input size="small" :disabled="true" v-bind:value="dialogData.type == 1 ? $t('ar.xj') : $t('ar.xy')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.dbzxjyl')+': '">
						<el-input v-model="dialogData.single_min_transaction" size="small">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.dbzdjyl')+': '">
						<el-input v-model="dialogData.single_max_transaction" size="small">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.dbzdmchl')+': '">
						<el-input v-model="dialogData.max_buy_limit" size="small">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.zdmchl')+': '">
						<el-input v-model="dialogData.max_sale_limit" size="small">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.zdchl')+': '">
						<el-input v-model="dialogData.max_net_limit" size="small">
						</el-input>
					</el-form-item>
				</div>
				<!-- 报价点差部份 -->
				<div v-if="dialogType=='eight'">
					<el-form-item :label="$t('ar.spmc')+': '">
						<el-input size="small" :disabled="true" :value="$t('ar.btc')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.lx')+': '">
						<el-input size="small" :disabled="true" v-bind:value="dialogData.type == 1 ? $t('ar.xj') : $t('ar.xy')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.bjdc')+': '">
						<el-input v-model="dialogData.order_diff" size="small">
						</el-input>
					</el-form-item>
				</div>
				<!-- 审核设置部份 -->
				<div v-if="dialogType=='night'">
					<el-form-item :label="$t('ar.spmc')+': '">
						<el-input size="small" :disabled="true" :value="$t('ar.btc')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.lx')+': '">
						<el-input size="small" :disabled="true" v-bind:value="dialogData.type == 1 ? $t('ar.xj') : $t('ar.xy')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.msh')+': '">
						<el-input v-model="dialogData.small_limit" size="small">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.ddzsh')+': '">
						<el-input v-model="dialogData.big_limit" size="small">
						</el-input>
					</el-form-item>
				</div>
				<!-- 汇率设置部份 -->
				<div v-if="dialogType=='ten'">
					<el-form-item :label="$t('ar.spmc')+': '">
						<el-input size="small" :disabled="true" :value="$t('ar.btc')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.lx')+': '">
						<el-input size="small" :disabled="true" v-bind:value="dialogData.type == 1 ? $t('ar.xj') : $t('ar.xy')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.mjhl')+': '">
						<el-input v-model="dialogData.exchange_rate" size="small">
						</el-input>
					</el-form-item>
				</div>
				<!-- 汇率设置部份 -->
				<div v-if="dialogType=='eleven'">
					<el-form-item :label="$t('ar.spmc')+': '">
						<el-input size="small" :disabled="true" :value="$t('ar.btc')">
						</el-input>
					</el-form-item>
					<el-form-item :label="$t('ar.zdchl')+': '">
						<el-input v-model="dialogData.item_number" size="small">
						</el-input>
					</el-form-item>
				</div>
			</el-form>
			<span slot="footer" class="dialog-footer">
                    <el-button @click="dialogPriceVisible = false">{{$t('ar.qx')}}</el-button>
                    <el-button type="primary" @click="dialogSave" :loading="dialogLoading">{{$t('ar.qr')}}</el-button>
            </span>
		</el-dialog>
	</div>
</template>
<script>
	import Vue from "vue";
	import request from "@/utils/request";
	import {
		getUserInfo
	} from "@/utils/apiUtils";
	import {
		Tabs,
		TabPane,
		Button,
		Row,
		Col,
		Input,
		Table,
		TableColumn,
		Dialog,
		Form,
		FormItem,
		InputNumber,
		Select,
		Option,
		Message,
		Card
	} from "element-ui";

	Vue.use(Button);
	Vue.use(Input);
	Vue.use(Row);
	Vue.use(Col);
	Vue.use(Table);
	Vue.use(TableColumn);
	Vue.use(Dialog);
	Vue.use(Form);
	Vue.use(FormItem);
	Vue.use(Tabs);
	Vue.use(TabPane);
	Vue.use(InputNumber);
	Vue.use(Select);
	Vue.use(Option);
	Vue.use(Card);
	export default {
		data() {
			return {
				userInfo: {},
				activeName: "first",
				tableBlownData: [],
				tableDepositData: [],
				tableTradingPermissionsData: [],
				tableServiceFeeData: [],
				tableOvernightFeeData: [],
				tableorderLimitData: [],
				riskData: {},
				tableorderDiffData: [],
				tableReviewData: [],
				tableExchangeRateData: [],
				tableOrderTotalData: [],
				dialogPriceVisible: false,
				dialogTitle: "",
				dialogData: {},
				dialogWidth: "400px",
				dialogType: "",
				dialogLoading: false,
				priceSteps: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
				privilegesOption: [{
					k: 0,
					v: this.$t('ar.wu')
				}, {
					k: 1,
					v: this.$t('ar.you')
				}],
				overnightOption: [{
					k: 0,
					v: this.$t('ar.ac')
				}, {
					k: 1,
					v: this.$t('ar.ar')
				}],
				form: []
			};
		},
		mounted() {
			this.userInfo = getUserInfo();
			if(this.userInfo.level == 0) {
				this.getData("first");
				this.activeName = "first";
			} else {
				this.getData("seven");
				this.activeName = "seven";
			}

		},
		methods: {
			handleClick(tab, event) {
				this.getData(tab.$options.propsData.name);
				console.log(tab, event);
			},
			getData(tab) {
				var url;
				let that = this;
				switch(tab) {
					case "first":
						url = "/index.php?r=btc/config/price-blown";
						request({
							method: "get",
							url: url
						}).then(res => {
							that.tableBlownData = res.data.data;
						});
						break;
					case "second":
						url = "/index.php?r=btc/config/trade-permission";
						request({
							method: "get",
							url: url
						}).then(res => {
							that.tableTradingPermissionsData = res.data.data;
						});
						break;
					case "third":
						url = "/index.php?r=btc/config/deposit";
						request({
							method: "get",
							url: url
						}).then(res => {
							that.tableDepositData = res.data.data;
						});
						break;
					case "fourth":
						url = "/index.php?r=btc/config/service-fee";
						request({
							method: "get",
							url: url
						}).then(res => {
							that.tableServiceFeeData = res.data.data;
						});
						break;
					case "five":
						url = "/index.php?r=btc/config/overnight-fee";
						request({
							method: "get",
							url: url
						}).then(res => {
							that.tableOvernightFeeData = res.data.data;
						});
						break;
					case "six":
						url = "/index.php?r=btc/config/order-limit";
						request({
							method: "get",
							url: url
						}).then(res => {
							that.tableorderLimitData = res.data.data;
						});
						break;
					case "seven":
						url = "/index.php?r=btc/config/risk";
						request({
							method: "get",
							url: url
						}).then(res => {
							that.form = res.data.data;
						});
						break;
					case "eight":
						url = "/index.php?r=btc/config/order-diff";
						request({
							method: "get",
							url: url
						}).then(res => {
							that.tableorderDiffData = res.data.data;
						});
						break;
					case "night":
						url = "/index.php?r=btc/config/review";
						request({
							method: "get",
							url: url
						}).then(res => {
							that.tableReviewData = res.data.data;
						});
						break;
					case "ten":
						url = "/index.php?r=btc/config/exchange-rate";
						request({
							method: "get",
							url: url
						}).then(res => {
							that.tableExchangeRateData = res.data.data;
						});
						break;
					case "eleven":
						url = "/index.php?r=btc/config/user-order-total";
						request({
							method: "get",
							url: url
						}).then(res => {
							that.tableOrderTotalData = res.data.data;
						});
						break;
				}
			},
			onRiskSubmit(row, type) {
				this.dialogData = row;
				this.dialogType = type;
				this.dialogSave();
			},
			handleEdit(index, row, type) {
				this.dialogPriceVisible = true;
				this.dialogData = row;
				this.dialogWidth = "500px";
				this.dialogType = type;
				switch(type) {
					case "first":
						this.dialogTitle = this.$t('ar.jgrdsz');
						break;
					case "second":
						this.dialogTitle = this.$t('ar.jyqxsz');
						break;
					case "third":
						this.dialogTitle = this.$t('ar.bzjsz');
						break;
					case "fourth":
						this.dialogTitle = this.$t('ar.sxfsz');
						break;
					case "five":
						this.dialogTitle = this.$t('ar.gyfsz');
						break;
					case "six":
						this.dialogTitle = this.$t('ar.cclsz');
						break;
					case "eight":
						this.dialogTitle = this.$t('ar.dcsz');
						break;
					case "night":
						this.dialogTitle = this.$t('ar.shsz');
						break;
					case "ten":
						this.dialogTitle = this.$t('ar.hlsz');
						break;
					case "eleven":
						this.dialogTitle = this.$t('ar.zdchlsz');
						break;
				}

			},
			dialogSave() {
				var url;
				let that = this;
				let errMsg = "";
				this.dialogLoading = true;
				switch(this.dialogType) {
					case "first":
						url = "/index.php?r=btc/config/price-blown-save";
						break;
					case "second":
						url = "/index.php?r=btc/config/trade-permission-save";
						break;
					case "third":
						url = "/index.php?r=btc/config/deposit-save";
						break;
					case "fourth":
						url = "/index.php?r=btc/config/service-fee-save";
						if(this.dialogData.single_open_percentage.isNum() == false || this.dialogData.single_open_percentage.toFloat() < 0) {
							errMsg = this.$t('ar.errMsg1') ;
						} else if(this.dialogData.single_open_limit_percentage.isNum() == false || this.dialogData.single_open_limit_percentage.toFloat() < 0) {
							errMsg = this.$t('ar.errMsg2');
						} else if(this.dialogData.single_close_percentage.isNum() == false || this.dialogData.single_close_percentage.toFloat() < 0) {
							errMsg = this.$t('ar.errMsg3');
						} else if(this.dialogData.single_close_limit_percentage.isNum() == false || this.dialogData.single_close_limit_percentage.toFloat() < 0) {
							errMsg = this.$t('ar.errMsg4');
						} else if(this.dialogData.single_open_limit_percentage.toFloat() < this.dialogData.single_open_percentage.toFloat()) {
							errMsg = this.$t('ar.errMsg5');
						} else if(this.dialogData.single_close_limit_percentage.toFloat() < this.dialogData.single_close_percentage.toFloat()) {
							errMsg = this.$t('ar.errMsg6');
						}
						break;
					case "five":
						url = "/index.php?r=btc/config/overnight-fee-save";
						if(this.dialogData.buy_percentage.isNum() == false || this.dialogData.buy_percentage.toFloat() < 0) {
							errMsg = this.$t('ar.errMsg7');
						}
						if(this.dialogData.sale_percentage.isNum() == false || this.dialogData.sale_percentage.toFloat() < 0) {
							errMsg = this.$t('ar.errMsg8');
						}
						break;
					case "six":
						url = "/index.php?r=btc/config/order-limit-save";
						if(this.dialogData.single_min_transaction.isNum() === false) {
							errMsg = this.$t('ar.errMsg9');
						} else if(this.dialogData.single_max_transaction.isNum() === false) {
							errMsg = this.$t('ar.errMsg10');
						} else if(parseFloat(this.dialogData.single_min_transaction) > parseFloat(this.dialogData.single_max_transaction)) {
							errMsg = this.$t('ar.errMsg11');
						} else if(this.dialogData.max_buy_limit.isNum() === false) {
							errMsg = this.$t('ar.errMsg12');
						} else if(this.dialogData.max_sale_limit.isNum() === false) {
							errMsg = this.$t('ar.errMsg13');
						} else if(this.dialogData.max_net_limit.isNum() === false) {
							errMsg = this.$t('ar.errMsg14');
						}
						break;
					case "seven":
						url = "/index.php?r=btc/config/risk-save";
						if(this.dialogData.xy_call_margin_warn_percentage.isNum() === false || this.dialogData.xy_call_margin_warn_percentage.toInt() <= 0) {
							errMsg = this.$t('ar.errMsg15');
						}
						if(this.dialogData.xy_cut_margin_warn_percentage.isNum() === false || this.dialogData.xy_cut_margin_warn_percentage.toInt() <= 0) {
							errMsg = this.$t('ar.errMsg16');
						}
						if(this.dialogData.xj_call_margin_warn_percentage.isNum() === false || this.dialogData.xj_call_margin_warn_percentage.toInt() <= 0) {
							errMsg = this.$t('ar.errMsg17');
						}
						if(this.dialogData.xj_cut_margin_warn_percentage.isNum() === false || this.dialogData.xj_cut_margin_warn_percentage.toInt() <= 0) {
							errMsg = this.$t('ar.errMsg18');
						}
						if(this.dialogData.max_win_percentage.isNum() === false || this.dialogData.max_win_percentage.toInt() <= 0) {
							errMsg = this.$t('ar.errMsg19');
						}
						break;
					case "eight":
						url = "/index.php?r=btc/config/order-diff-save";
						if(this.dialogData.order_diff.isNum() === false || this.dialogData.order_diff.toInt() <= 0) {
							errMsg = this.$t('ar.errMsg20');
						}
						break;
					case "night":
						debugger
						url = "/index.php?r=btc/config/review-save";
						if(this.dialogData.small_limit.isNum() === false || this.dialogData.small_limit.toInt() <= 0) {
							errMsg = this.$t('ar.errMsg21');
						} else if(this.dialogData.big_limit.isNum() === false || this.dialogData.big_limit.toInt() <= 0) {
							errMsg = this.$t('ar.errMsg22');
						} else if(this.dialogData.small_limit.toInt() >= this.dialogData.big_limit.toInt()) {
							errMsg = this.$t('ar.errMsg23');
						}
						break;
					case "ten":
						url = "/index.php?r=btc/config/exchange-rate-save";
						if(this.dialogData.exchange_rate.isNum() === false || this.dialogData.exchange_rate.toFloat() <= 0) {
							errMsg = this.$t('ar.errMsg24');
						}
						break;
					case "eleven":
						url = "/index.php?r=btc/config/user-order-total-save";
						if(this.dialogData.item_number.isNum() === false || this.dialogData.item_number.toFloat() <= 0) {
							errMsg = this.$t('ar.errMsg25');
						}
						break;
				}

				if(errMsg != "") {
					Message({
						center: true,
						message: errMsg,
						duration: 1200,
						type: 'error',
						onClose: () => {
							this.dialogLoading = false;
						}
					});
					return;
				}
				request({
					method: "post",
					data: this.dialogData,
					url: url
				}).then(res => {
					let data = res.data;
					if(data.status == 1) {
						Message({
							center: true,
							message: this.$t('ar.sucMsg1'),
							duration: 1800,
							type: 'success',

						});
						this.dialogLoading = false;
						this.dialogPriceVisible = false;
						this.getData(this.dialogType);
					} else {
						Message({
							center: true,
							message: this.$t('ar.errMsg26'),
							duration: 1800,
							type: 'warning',
						});
					}
				});
				this.dialogLoading = false;
			}
		}
	};
</script>